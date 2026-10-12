
from django.contrib import admin
from trading.models import Stock, PriceData, MomentumScore, TradingSignal, RebalanceEvent


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = (
     'ticker',
     'name',
     'sector',
     'is_active',
     'created_at'
    )
    list_filter = ( 'is_active', 'created_at')
    search_fields = ('ticker', 'name', 'sector')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(PriceData)
class PriceDataAdmin(admin.ModelAdmin):
    list_display = (
     'stock',
     'date',
     'close',
     'volume',
     
    )
    list_filter = ('date', 'stock')
    search_fields = ('stock__ticker', 'stock__name')
    readonly_fields = ('created_at',)
    date_hierarchy = 'date'


@admin.register(MomentumScore)
class MomentumScoreAdmin(admin.ModelAdmin):
    list_display = (
     'stock',
     'calculation_date',
     'momentum_score',
     'rank',
     'quintile',
     'is_top_quintile',
     'period_start',
     'period_end'
    )
    list_filter = ('is_top_quintile', 'quintile', 'calculation_date')
    search_fields = ('stock__ticker', 'stock__name')
    readonly_fields = ('created_at',)
    ordering = ('calculation_date', 'rank')
    date_hierarchy = 'calculation_date'


@admin.register(TradingSignal)
class TradingSignalAdmin(admin.ModelAdmin):
    list_display = (
     'stock',
     'signal_date',
     'signal_type',
     'momentum_score',
     'target_value',
     'is_executed',
     'executed_at'
    )
    list_filter = ('signal_type', 'is_executed', 'signal_date')
    search_fields = ('stock__ticker', 'stock__name', 'reason')
    readonly_fields = ('created_at','executed_at')
    date_hierarchy = 'signal_date'


@admin.register(RebalanceEvent)
class RebalanceEventAdmin(admin.ModelAdmin):
    list_display = (
     'date',
     'total_stocks_analyzed',
     'buy_signals_generated',
     'sell_signals_generated',
     'total_portfolio_value',
     'execution_status',
     'created_at'
    )
    list_filter = ('execution_status', 'date')
    search_fields = ('execution_status', 'error_message')
    readonly_fields = ('created_at',)
    date_hierarchy = 'date'