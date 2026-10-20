
from django.conf import settings
from snaptrade_client import SnapTrade
from portfolio.models import Portfolio, Position
from trading.models import Stock
from portfolio.models import Trade
from typing import List, Optional
from decimal import Decimal
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class TradingExecutor:
    def __init__(self):
        self.snaptrade = SnapTrade(
            consumer_key=settings.SNAPTRADE_CLIENT_SECRET,
            client_id=settings.SNAPTRADE_CLIENT_ID,
        )

    def sync_portfolio_position(
        self,
        portfolio: Portfolio,
        user_secret: Optional[str] = None,
    ) -> List[Position]:
        if not portfolio.snaptrade_user_id or not portfolio.snaptrade_account_id:
            raise ValueError('Portfolio must have SnapTrade user and account IDs')
        if not user_secret:
            raise ValueError('SnapTrade user secret is required for API operations')

        try:
            position_response=(
                self.snaptrade.account_information.get_user_account_positions(
                    user_id = portfolio.snaptrade_user_id,
                    user_secret=user_secret,
                    account_id = portfolio.snaptrade_account_id
                )
            )
            # Accessing response body SDK returns API ResponsesFor 200 object
            position_data = position_response.body
            synced_positions = []

            for pos_data in position_data:
                # Snaptrade has nested symbol structure: symbol -> symbol -> raw_symbol
                symbol= (
                    pos_data.get('symbol',{}).get('symbol',{}).get('raw_symbol','')
                )
                quantity = float(pos_data.get('units',0))
                avarage_cost = float(pos_data.get('avarage_purchase_price',0))
                current_price = float(pos_data.get('price',0))

                if not symbol or quantity <= 0:
                    continue

                # Get or create stock
                stock, _ = Stock.objects.get_or_create(
                    ticker=symbol, defaults={'name':symbol, 'is_active':True}
                ) 

                # update or create a position 
                position, created = Position.objects.update_or_create(
                    portfolio=portfolio,
                    stock=stock,
                    defaults={
                        'quantity':quantity,
                        'average_cost':Decimal(str(avarage_cost)),
                        'current_price':Decimal(str(current_price))
                    }
                )

                position.update_current_value()
                position.save()
                synced_positions.append(position)

                logger.info(
                    f"{'Created' if created else 'updated'} position: {symbol} - {quantity} shares"

                )
                # update portfolio cash balance using SDK
                balance_response = (
                    self.snaptrade.account_information.get_user_account_balance(
                        user_id=portfolio.snaptrade_user_id,
                        user_secret= user_secret,
                        account_id = portfolio.snaptrade_account_id
                    )
                )
                # Assecing response body (SDK returns ApiResponseFor200)
                balance_data = balance_response.body
                if(
                     balance_data
                     and isinstance(balance_data, list)
                     and len(balance_data) > 0
                 ):
                    # Snaptrade returns balance as a list, get the first USD account
                    balance_item = balance_data[0]
                    cash_balance = float(balance_item.get('cash', 0))
                    portfolio.current_cash = Decimal(str(cash_balance))
                    portfolio.calculate_total_value()
                    portfolio.save()
                    logger.info(f"Updated portfolio cash balance to ${cash_balance}")

                    return synced_positions
        except (ValueError, TypeError, KeyError) as e:
            logger.error(f"Error syncing portfolio positions: {str(e)}")
            raise 
                

    def execute_buy_orders(
        self,
        portfolio: Portfolio,
        buy_list: List[Stock],
        total_value: Decimal,
        user_secret: Optional[str] = None,
    ) -> List[Trade]:
        if not buy_list:
            return []

        if not user_secret:
            raise ValueError('SnapTrade user is required for trading operations')

        # Calculate equal weight allocation 
        allocation_per_stock = total_value / len(buy_list)
        executed_trades = []

        for stock in buy_list:
            try:
                 # Create trade record(Quantity will be detrmined by snaptrade based on notational value)
                trade = Trade.objects.create(
                     portfolio=portfolio,
                     stock=stock,
                     trade_type = 'BUY',
                     quantity= 0, # Will be updated after execution with actual shares purchaced 
                     price= allocation_per_stock, #Stoew the dollar amount for reference
                     status= 'PENDING'
                 )

                 # Place notational value order via snaptrade SDK
                order_response = self.snaptrade.trading.place_force_order(
                    user_id=portfolio.snaptrade_user_id,
                    user_secret=user_secret,
                    account_id=portfolio.snaptrade_account_id,
                    action="BUY",
                    order_type="Market",
                    time_in_force="Day",
                    symbol=stock.ticker,
                    units=None,
                    notional_value=float(allocation_per_stock),
                    price=None,
                    stop=None,
                )

                order_results = order_response.body

                if isinstance(order_results, dict):
                    external_order_id = (
                        order_results.get("brokerage_order_id")
                        or order_results.get("id")
                    )
                else:
                    external_order_id = (
                        getattr(order_results, "brokerage_order_id", None)
                        or getattr(order_results, "id", None)
                    )

                if not external_order_id:
                    raise RuntimeError(
                        f"No order ID returned for {stock.ticker}"
                    )

                trade.external_order_id = external_order_id
                trade.status = "SUBMITTED"
                trade.save(
                    update_fields=["external_order_id", "status"]
                )

                executed_trades.append(trade)
                logger.info(
                     f'Submitted buy order: ${float(allocation_per_stock)} notional value of {stock.ticker}'
                 )

            except Exception as e:
                logger.error(
                    f'Error excecuting buy order for {stock.ticker}: {str(e)}')

                    # Re-raise the exceptions to surface SnapTrade errors to the UI
                raise Exception(f'Buy order failed for {stock.ticker}: {str(e)}')
                

        return executed_trades


    
   
    def execute_sell_orders(
        self,
        portfolio: Portfolio,
        sell_list: List[Stock],
        user_secret: Optional[str] = None,
    ) -> List[Trade]:
        if not sell_list:
            return []

        if not user_secret:
            raise ValueError("SnapTrade user secret is required for trading operations")

        if not portfolio.snaptrade_user_id or not portfolio.snaptrade_account_id:
            raise ValueError("Portfolio must have SnapTrade user and account IDs")

        submitted_trades = []

        # Prevent submitting duplicate sell orders for the same ticker in this batch.
        unique_stocks = {stock.pk: stock for stock in sell_list}

        for stock in unique_stocks.values():
            trade = None

            try:
                # Find the position actually held in this portfolio.
                position = Position.objects.filter(
                    portfolio=portfolio,
                    stock=stock,
                ).first()

                if position is None:
                    logger.warning("Skipping %s: no position found", stock.ticker)
                    continue

                quantity = Decimal(str(position.quantity or 0))

                if quantity <= 0:
                    logger.warning(
                        "Skipping %s: no positive quantity available to sell",
                        stock.ticker,
                    )
                    continue

                # Create a local trade record before submitting the order.
                trade = Trade.objects.create(
                    portfolio=portfolio,
                    stock=stock,
                    trade_type="SELL",
                    quantity=quantity,
                    price=Decimal("0"),  # Replace with a quote if your model requires it.
                    status="PENDING",
                )

                # Submit a quantity-based market sell order.
                order_response = self.snaptrade.trading.place_force_order(
                    user_id=portfolio.snaptrade_user_id,
                    user_secret=user_secret,
                    account_id=portfolio.snaptrade_account_id,
                    action="SELL",
                    order_type="Market",
                    time_in_force="Day",
                    symbol=stock.ticker,
                    units=float(quantity),
                    notional_value=None,
                    price=None,
                    stop=None,
                )

                order_results = (
                    order_response.body
                    if hasattr(order_response, "body")
                    else order_response
                )

                if isinstance(order_results, dict):
                    external_order_id = (
                        order_results.get("brokerage_order_id")
                        or order_results.get("id")
                    )
                else:
                    external_order_id = (
                        getattr(order_results, "brokerage_order_id", None)
                        or getattr(order_results, "id", None)
                    )

                if not external_order_id:
                    raise RuntimeError(
                        f"SnapTrade returned no order ID for {stock.ticker}"
                    )

                # Use the exact field name currently present in your code.
                trade.external_order_id = external_order_id
                trade.status = "SUBMITTED"
                trade.submitted_at = datetime.now()
                trade.save()

                submitted_trades.append(trade)

                logger.info(
                    "Submitted SELL order for %s: quantity=%s, order_id=%s",
                    stock.ticker,
                    quantity,
                    external_order_id,
                )

            except Exception as e:
                logger.exception("Error submitting sell order for %s", stock.ticker)

                if trade is not None:
                    trade.status = "FAILED"
                    trade.save(update_fields=["status"])

                raise RuntimeError(
                    f"Sell order failed for {stock.ticker}: {e}"
                ) from e

        return submitted_trades


        
    def update_trade_status(
        self,
        trade: Trade,
        user_secret: Optional[str] = None,
    ) -> Trade:
        if not trade.external_order_id or trade.status in [
            'FILLED',
            'CANCELLED',
            'REJECTED'
        ]:
            return False

        if not user_secret:
            raise ValueError(
                'Snaptrade user secret is required for trade status  update'
            )
        
        try:
            
            # Get orders status using Snaptrade SDK
            order_status = self.snaptrade.trading.get_order_status(
                user_id=trade.portfolio.snaptrade_user_id,
                user_secret= user_secret,
                account_id= trade.portfolio.snaptrade_account_id,
                order_id = trade.external_order_id,
            )

            old_status = trade.status
            trade.status = order_status.get('state', trade.status)

            if order_status.get("filled_units"):
                trade.filled_quantity = float(order_status['filled_units'])
            if order_status.get('executed_price'):
                trade.filled_price = Decimal(str(order_status['executed_price']))

            if trade.status == 'FILLED':
                trade.filled_at = datetime.now()
                trade.update_position()

            trade.save()

            if old_status != trade.status:
                logger.info(
                    f'Trade {trade.id} status updated: {old_status} -> {trade.status}'
                )
            return True

        except (ValueError, TypeError, KeyError) as e:
            logger.error(
                f'Error updating trade status for trade {trade.id}: {str(e)}'

            )
            return False

            

    def _get_current_stock_price(
        self,
        ticker:str
    ) ->Optional[ Decimal]:
        try:
            from trading.services.massive_client import get_massive_client

            massive_client = get_massive_client()
            price = massive_client.get_price_on_date(ticker, datetime.now())
            return Decimal(str(price)) if price else None
        except (ValueError, TypeError) as e:
            logger.error(
                f'Error getting current price for {ticker}: {str(e)}'
            )
            return e 


    def get_available_cash_for_trading(
        self,
        portfolio: Portfolio,
        user_secret: Optional[str] = None,
    ) -> Decimal:
        return portfolio.current_cash * Decimal('0.95')


def get_trading_executor()->TradingExecutor:
    return TradingExecutor() 