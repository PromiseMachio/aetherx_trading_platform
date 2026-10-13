from django.conf import settings 
from massive import RESTClient 
import pandas as pd
from typing import List, Dict, Optional
from datetime import datetime, timedelta, date, datetime, timedelta
import logging 
import time
from urllib3.exceptions import MaxRetryError
from massive.exceptions import BadResponse 

logger = logging.getLogger(__name__)

class MassiveAPIClient:
    def __init__(self, api_key: str = None, requests_per_minute: int=5):
        self.api_key = api_key or settings.MASSIVE_API_KEY
        if not self.api_key:
            raise ValueError('Massive API key is required')

        self.client = RESTClient(self.api_key)
        self.requests_per_minute = requests_per_minute
        self._cache = {}
        self.request_times = []

    def _get_cache_key(self, ticker:str, start_date:str, end_date:str) -> str:
        """Generate cache key for API requests"""
        return f"{ticker}:{start_date}:{end_date}"

    def _rate_limit(self):
        """Implimenting rate limits to avoid hitting API limits"""
        current_time = time.time()

        #Removing time older than a minute 
        self.request_times = [t for t in self.request_times if current_time - t < 60]
  
        if len(self.request_times) >= self.requests_per_minute:
            sleep_time = 60 - (current_time - self.request_times[0]) + 1
            if sleep_time > 0:
                logger.info(f'Rate limiting: sleeping for {sleep_time:.2f} seconds')
                time.sleep(sleep_time) 
        self.request_times.append(current_time)

    def fetch_stock_data(
            self,
            ticker:str,
            start_date:str,
            end_date:str,
            multiplier:int=1,
            timespan:str='day',
            adjusted: bool = True,
            limit: int = 50000, 
            use_cache : bool = True,
            max_retries: int = 3,
            retry_delay: int = 60
    ) -> List[Dict]:
        cache_key = self._get_cache_key(ticker, start_date, end_date)

        #Checking cache first 
        if use_cache and cache_key in self._cache:
            logger.info(f"Using cached data for {ticker}")
            return self._cache[cache_key]
        # Apply rate limiting
        self._rate_limit()

        for attempt in range(max_retries):
            try:
                aggs = []

                for item in self.client.list_aggs(
                    ticker=ticker,
                    multiplier=multiplier,
                    timespan=timespan,
                    from_=start_date,
                    to=end_date,
                    adjusted=adjusted,
                    limit=limit,
                ):
                    aggs.append({
                        "date": datetime.fromtimestamp(
                            item.timestamp / 1000
                        ).date(),
                        "open": item.open,
                        "high": item.high,
                        "low": item.low,
                        "close": item.close,
                        "volume": item.volume,
                        "vwap": getattr(item, "vwap", None),
                        "transactions": getattr(item, "transactions", None),
                    })

                # Execute only after all candles have been collected.
                if use_cache:
                    self._cache[cache_key] = aggs

                logger.info("Fetched %d data points for %s", len(aggs), ticker)
                return aggs
            except MaxRetryError as e:
                if '429' in str(e) and attempt < max_retries - 1:
                    logger.warning(
                        f'Rate limited on attempt {attempt + 1} for {ticker}, retrying in {retry_delay} seconds'
                    )
                    time.sleep(retry_delay)
                    continue
                else:
                    logger.error(f'Max retries exceeded for {ticker}: {str(e)}')
                    raise
            except(ValueError, TypeError, BadResponse) as e:
                logger.error(f'Error fetching data for {ticker}: {str(e)}')
                raise
    # def fetch_bulk_momentum_data(
    #         self, tickers: List[str], calculation_date:datetime= None
    # )-> Dict[str,Dict[str,Optional[float]]]:

    #     if calculation_date is None:
    #         calculation_date = datetime.now().date()

    #     twelve_months_ago = calculation_date - timedelta(days=365)
    #     one_month_ago = calculation_date - timedelta(days=30)

    #     logger.info(
    #         f'TRUE bulk fetching momentum data for {len(tickers)} stocks using grouped daily API'
    #     )
    #     logger.info(f'Target dates: 12m={twelve_months_ago}, 1m={one_month_ago}')

    #     momentum_data = {}

    #     # Initialize all tickers with None values
    #     for ticker in tickers:
    #         momentum_data[ticker] = {'Price_12m': None, 'Price_1m':None}

    #         try: 
    #             #Apply rate limiting
    #             self._rate_limit()

    #             # Call 1: Get al stocks prices for 12 months
    #             logger.info(
    #                 f'Fetching grouped daily data for 12 month ago ({twelve_months_ago})'
    #             )
    #             twelve_months_data = self.client.get_grouped_daily_aggs(
    #                 date=twelve_months_ago, adjusted=True
    #             )

    #             #   Process 12 months data
    #             twelve_months_price= {}
    #             for agg in twelve_months_data:
    #                 if hasattr(agg, 'ticker') and agg.ticker in tickers:
    #                     twelve_months_price[agg.ticker] = float(agg.close)

    #             logger.info(f'Found 12-month prices for {len(twelve_months_price)} stocks')

    #             # Applying rate limiting 
    #             self._rate_limit()

    #             # Call 2: Get all stocks for 1 month ago (1 API call)
    #             one_month_data = self.client.get_grouped_daily_aggs(
    #                 date=one_month_ago, adjusted=True
    #             )                    

    #             # Process 1-month data
    #             one_month_price = {}
    #             for agg in one_month_data:
    #                 if hasattr(agg, 'ticker') and agg.ticker in tickers:
    #                     one_month_price[agg.ticker] = float(agg.close)

    #                 logger.info(f'Found 1-month prices for {len(one_month_price)} stocks')

    #                 #Combine result
    #                 for ticker in tickers:
    #                     momentum_data[ticker] = {
    #                         'Price_12m': twelve_months_price.get(ticker),
    #                         'Price_1m': one_month_price.get(ticker)
    #                     }

    #                     logger.debug(
    #                         f'Momentum data for {ticker}:'
    #                         f'12m=${momentum_data[ticker]['price_12m']},'
    #                         f'1m=${momentum_data[ticker]['price_1m']}'
    #                     )

    #                     # Handle weekends and holydays fallback if needed 
    #                     missing_tickers = [
    #                         t 
    #                         for t in tickers
    #                         if not momentum_data[t]['price_12m'] or not momentum_data[t]['price_1m']
    #                     ]
    #                     if missing_tickers:
    #                         logger.info(
    #                             f'Handling {len(missing_tickers)} stocks with missing data fallback dates'
    #                         )
    #                         momentum_data = self._handle_missing_data_fallback(
    #                             momentum_data, missing_tickers, calculation_date
    #                         )
    #                         logger.info(f'Successfully fetched momentum data using only 2 API calls!')
    #         except Exception as e:
    #             logger.error(f'Error with grouped daily API, falling back to individual calls:{str(e)}')
    #             # Fallback to older method if grouped daily API, fails
    #             return self._fetch_bulk_momentum_data_fallback(tickers,calculation_date)

    #         return momentum_data

    def _fetch_bluk_momentum_data_fallback(self,tickers:List[str], calculations_date: datetime)-> Dict[str,Dict[str,Optional[float]]]:
        """
        Fallback to the older method if grouped daily API fails
        """
        logger.warning('Using fallback method - this is slower')

        twelve_months_ago = calculations_date - timedelta(days=365)
        one_month_ago = calculations_date - timedelta(days=30)

        # Use broader date range to capture both periods
        start_date = twelve_months_ago - timedelta(days=30)
        end_date = calculations_date + timedelta(days=7)

        logger.info(
            f'Fallback: fetching momentum data {len(tickers)} stocks from {start_date} to {end_date}'
        )

        # Fetching all data with batching 
        all_data = self.fetch_multiple_stocks(
            tickers=tickers,
            start_date=start_date.strftime("%Y-%m-%d"),
            end_date = end_date.strftime("%Y-%m-%d"),
            batch_size = 5, # Smaller batch size for bulk operations
            delay_between_batches = 12 

        )
        # Extract prices for momentum calculation
        momentum_data = {}
        for ticker in tickers:
            data = all_data.get(tickers,[])
            if not data:
                momentum_data[ticker] = {'price_12m':None, 'price_1m':None}
                continue

            # COnvert to DataFrame for easier date filtering 
            df['date'] = pd.to_datetime(df['date'])
            df = df.sort_values('date')

            # Find the closest prices to target dates
            prices_12m = self._find_closest_price(df, twelve_months_ago)
            prices_1m = self._find_closest_price(df, one_month_ago)

            momentum_data[ticker] = {'price_12m': prices_12m, 'price_1m':prices_1m}

            logger.debug(
                f'Momentum data for {ticker}: 12m=${prices_12m}, 1m=${prices_1m}'

            )
            return momentum_data

    def _handle_missing_data_fallback(
            self,
            momentum_data: Dict[str,Dict[str, Optional[float]]],
            missing_tickers: List[str],
            calculation_date: datetime,
    )-> Dict[str,Dict[str,Optional[float]]]:
        # Handling missing data by trying neaby dates (Weekends and holidays)
        twelve_months_ago = calculation_date - timedelta(days=365)
        one_month_ago = calculation_date -timedelta(days=30)

        #Try dates within a 7-day window 
        for days_offset in [1,2,3,-1,-2,-3,4,5,6,7,-4,-5,-6,-7]:
            if not missing_tickers:
                break

            # Try 12-m fallback
            fallback_12m_date = twelve_months_ago + timedelta(days=days_offset)
            try:
                self._rate_limit()
                fallback_12m_date = self.client.get_grouped_daily_aggs(
                    date=fallback_12m_date, adjusted=True
                )

                for agg in fallback_12m_date:
                    if hasattr(agg, 'ticker') and agg.ticker in missing_tickers:
                        if not momentum_data[agg.ticker]['price_12m']:
                            momentum_data[agg.ticker]['price_12m'] = float(agg.close)
                            logger.debug(
                                f'Found 12m price for {agg.ticker} on {fallback_12m_date}'
                            )
            except:
                pass

            # Try 1-month fallback
                        
            fallback_1m_date = one_month_ago + timedelta(days=days_offset)
            try:
                self._rate_limit()
                fallback_1m_date = self.client.get_grouped_daily_aggs(
                    date=fallback_1m_date, adjusted=True
                )

                for agg in fallback_1m_date:
                    if hasattr(agg, 'ticker') and agg.ticker in missing_tickers:
                        if not momentum_data[agg.ticker]['price_1m']:
                            momentum_data[agg.ticker]['price_1m'] = float(agg.close)
                            logger.debug(
                                f'Found 12m price for {agg.ticker} on {fallback_1m_date}'
                            )
            except:
                pass

            # Update missing tickers 
            missing_tickers = [
                t 
                for t in missing_tickers
                if not momentum_data[t]['price_12m'] or not momentum_data[t]['price_1m']
            ]

            return momentum_data




    def fetch_bulk_momentum_data(
        self,
        tickers: List[str],
        calculation_date: Optional[date] = None,
    ) -> Dict[str, Dict[str, Optional[float]]]:

        if calculation_date is None:
            calculation_date = datetime.now().date()

        twelve_months_ago = calculation_date - timedelta(days=365)
        one_month_ago = calculation_date - timedelta(days=30)

        # Initialize the output once for all requested tickers.
        momentum_data = {
            ticker: {"price_12m": None, "price_1m": None}
            for ticker in tickers
        }

        try:
            # API call 1: grouped daily stock prices.
            self._rate_limit()
            twelve_months_data = self.client.get_grouped_daily_aggs(
                date=twelve_months_ago.isoformat(),
                adjusted=True,
            )

            twelve_months_prices = {
                item.ticker: float(item.close)
                for item in twelve_months_data
                if getattr(item, "ticker", None) in tickers
                and item.close is not None
            }

            # API call 2: grouped daily stock prices.
            self._rate_limit()
            one_month_data = self.client.get_grouped_daily_aggs(
                date=one_month_ago.isoformat(),
                adjusted=True,
            )

            one_month_prices = {
                item.ticker: float(item.close)
                for item in one_month_data
                if getattr(item, "ticker", None) in tickers
                and item.close is not None
            }

            # Combine results after both API requests have completed.
            for ticker in tickers:
                momentum_data[ticker] = {
                    "price_12m": twelve_months_prices.get(ticker),
                    "price_1m": one_month_prices.get(ticker),
                }

            logger.info(
                "Fetched grouped price data for %d requested tickers",
                len(tickers),
            )

            return momentum_data

        except Exception:
            logger.exception("Grouped momentum data request failed")
            raise