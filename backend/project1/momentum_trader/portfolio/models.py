from django.db import models

# Create your models here.
class Portfolio(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    initial_cash = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    current_cash = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    total_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    snaptrade_user_id = models.CharField(max_length=255, blank=True, null=True)
    snaptrade_account_id = models.CharField(max_length=255, blank=True, null=True)
    snaptrade_user_secret = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'portfolios'
        ordering = ['name']

class Position(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='positions')
    stock = models.ForeignKey('trading.Stock', on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    average_cost = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    current_price = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    current_value = models.DecimalField(max_digits=20, decimal_places=2, default=0, null=True,blank=True)
    unrealized_pnl = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    unrealized_pnl_percentage = models.DecimalField(max_digits=10, decimal_places=4, default=0)
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table='positions'
        unique_together = ('portfolio','stock')
        ordering= ['-current_value']

class Trade(models.Model):
    TRADE_TYPES =[
        ('BUY','Buy'),
        ('SELL','Sell')
    ]
    STATUS_CHOICES = [
        ('PENDING','Pending'),
        ('SUBMITTED','Submitted'),
        ('FILLED','Filled'),
        ('PARTIALY_FILLED','Partialy Filled'),
        ('CANCELLED', 'Cancelled'),
        ('REJECTED','Rejected')
    ]
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='trades')
    stock = models.ForeignKey('trading.Stock', on_delete=models.CASCADE)
    trade_type = models.CharField(max_length=4, choices=TRADE_TYPES)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=20, decimal_places=8, null=True, blank=True)
    filled_quantity = models.IntegerField(default=0)
    filled_price = models.DecimalField(max_digits=20, decimal_places=8, null=True, blank=True)
    order_value = models.DecimalField(max_digits=20, decimal_places=2, default=0, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    external_order_id = models.CharField(max_length=255, blank=True, null=True)
    snaptrade_order_id = models.CharField(max_length=255, blank=True, null=True)
    commission = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    error_message = models.TextField(blank=True, null=True)
    submitted_at = models.DateTimeField(null=True, blank=True)
    filled_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'trades'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['portfolio', 'status']),
            models.Index(fields=['status','created_at'])
        ]

class PerformanceMetric(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='performance_metrics')
    date = models.DateField()
    total_cash = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    cash_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    position_value = models.DecimalField(max_digits=20, decimal_places=6, null=True, blank=True, default=0)
    daily_returns = models.DecimalField(max_digits=12, decimal_places=6, default=0)
    cumulative_returns = models.DecimalField(max_digits=12, decimal_places=6, null=True, blank=True, default=0)
    total_trades = models.PositiveIntegerField(default=0)
    winning_trades = models.PositiveIntegerField(default=0)
    losing_trades = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Performance_metrics'
        unique_together = ('portfolio', 'date')
        ordering = ['-date']
        indexes =[
            models.Index(fields=['portfolio','date'])
        ]


