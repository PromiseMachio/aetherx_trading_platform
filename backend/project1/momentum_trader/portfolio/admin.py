
from django.contrib import admin
from portfolio.models import Portfolio, Position, Trade, PerformanceMetric


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = (
     'name',
     'total_value',
     'current_cash',
     'is_active',
     'created_at'
     )
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = (
     'portfolio',
     'stock',
     'quantity',
     'average_cost',
     'current_value',
     'unrealized_pnl',
     'last_updated'
     )
    list_filter = ('portfolio', 'last_updated')
    search_fields = ('stock__ticker', 'stock__name', 'portfolio__name')
    readonly_fields = ('current_value', 'unrealized_pnl', 'unrealized_pnl_percentage', 'last_updated', 'created_at')
    


@admin.register(Trade)
class TradeAdmin(admin.ModelAdmin):
    list_display = (
     'stock',
     'portfolio',
     'trade_type',
     'quantity',
     'price',
     'status',
     'created_at'
     )
    list_filter = ('trade_type', 'status', 'created_at','portfolio')
    search_fields = ('stock__ticker', 'portfolio__name')
    readonly_fields = ('submitted_at', 'filled_at', 'created_at')
    date_hierarchy = 'created_at'



@admin.register(PerformanceMetric)
class PerformanceMetricAdmin(admin.ModelAdmin):
    list_display = (
     'portfolio',
     'date',
     'total_cash',
     'cash_value',
     'daily_returns',
     'cumulative_returns',
     )
    list_filter = ('date', 'portfolio')
    search_fields = ('portfolio__name',)
    readonly_fields = ('created_at',)

