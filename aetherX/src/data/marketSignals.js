
/*
|--------------------------------------------------------------------------
| AETHERX — MARKET INTELLIGENCE CONSTANTS
|--------------------------------------------------------------------------
| Purpose:
| - Market overview and ticker cards
| - Trading signal snippets
| - Detailed signal analysis
| - Chart data and technical indicators
| - Support/resistance and trade planning
| - Market filters and dashboard statistics
|
| IMPORTANT: All values are illustrative MOCK DATA.
| They are not live prices, verified signals, or trade recommendations.
|--------------------------------------------------------------------------
*/

// ==========================================================================
// 1. APP CONFIGURATION
// ==========================================================================

export const APP_CONFIG = {
  name: "AetherX",
  product: "Market Intelligence",
  version: "1.0.0",
  defaultMarket: "crypto",
  defaultTimeframe: "1H",
  defaultChartType: "candlestick",
  defaultCurrency: "USDT",
  refreshIntervalMs: 30_000,
  dataMode: "mock",
};

export const TIMEFRAMES = [
  { label: "15 Minutes", value: "15M" },
  { label: "30 Minutes", value: "30M" },
  { label: "1 Hour", value: "1H" },
  { label: "4 Hours", value: "4H" },
  { label: "1 Day", value: "1D" },
  { label: "1 Week", value: "1W" },
];

export const CHART_RANGES = [
  { label: "1D", value: "1D" },
  { label: "7D", value: "7D" },
  { label: "1M", value: "1M" },
  { label: "3M", value: "3M" },
  { label: "6M", value: "6M" },
  { label: "1Y", value: "1Y" },
];

export const MARKET_FILTERS = [
  { label: "All Signals", value: "all" },
  { label: "Bullish", value: "bullish" },
  { label: "Bearish", value: "bearish" },
  { label: "Watching", value: "watching" },
  { label: "Confirmed", value: "confirmed" },
];

export const STRATEGY_TYPES = [
  { label: "All Strategies", value: "all" },
  { label: "Momentum", value: "momentum" },
  { label: "Support & Resistance", value: "snr" },
  { label: "Breakout", value: "breakout" },
  { label: "Trend Following", value: "trend-following" },
  { label: "Mean Reversion", value: "mean-reversion" },
];

// ==========================================================================
// 2. MARKET OVERVIEW STATISTICS
// ==========================================================================

export const MARKET_OVERVIEW = {
  totalMarkets: 12,
  activeSignals: 8,
  bullishSignals: 5,
  bearishSignals: 3,
  neutralSignals: 4,
  marketsGaining: 7,
  marketsDeclining: 5,
  marketSentiment: "Mixed",
  source: "mock",
};

// ==========================================================================
// 3. CRYPTO ASSETS
// ==========================================================================

export const CRYPTO_ASSETS = [
  {
    symbol: "BTC",
    pair: "BTC/USDT",
    name: "Bitcoin",
    tagline: "Leading cryptocurrency",
    price: 67234.50,
    change: 2.34,
    volume: 42_800_000_000,
    volumeLabel: "42.8B",
    marketCap: 1_320_000_000_000,
    high24h: 67800,
    low24h: 65100,
    spark: [60100, 62400, 61800, 63900, 63200, 65700, 67234.50],
    category: "layer-1",
  },
  {
    symbol: "ETH",
    pair: "ETH/USDT",
    name: "Ethereum",
    tagline: "Smart contract ecosystem",
    price: 3842.18,
    change: 1.87,
    volume: 18_400_000_000,
    volumeLabel: "18.4B",
    marketCap: 462_000_000_000,
    high24h: 3890,
    low24h: 3750,
    spark: [3610, 3650, 3580, 3720, 3790, 3820, 3842.18],
    category: "layer-1",
  },
  {
    symbol: "AXR",
    pair: "AXR/USDT",
    name: "AetherX",
    tagline: "Illustrative project token",
    price: 4.82,
    change: 12.40,
    volume: 284_700_000,
    volumeLabel: "284.7M",
    marketCap: null,
    high24h: 4.95,
    low24h: 4.10,
    spark: [3.20, 3.50, 3.80, 4.10, 4.30, 4.60, 4.82],
    category: "other",
  },
  {
    symbol: "SOL",
    pair: "SOL/USDT",
    name: "Solana",
    tagline: "High-throughput blockchain",
    price: 187.43,
    change: -0.92,
    volume: 6_200_000_000,
    volumeLabel: "6.2B",
    marketCap: null,
    high24h: 192,
    low24h: 185,
    spark: [192, 190, 188, 191, 189, 188, 187.43],
    category: "layer-1",
  },
  {
    symbol: "AVAX",
    pair: "AVAX/USDT",
    name: "Avalanche",
    tagline: "Multi-chain infrastructure",
    price: 38.74,
    change: 3.21,
    volume: 1_800_000_000,
    volumeLabel: "1.8B",
    marketCap: null,
    high24h: 39.20,
    low24h: 36.80,
    spark: [35, 36, 37, 36.5, 37.5, 38, 38.74],
    category: "layer-1",
  },
  {
    symbol: "DOT",
    pair: "DOT/USDT",
    name: "Polkadot",
    tagline: "Interoperable blockchain network",
    price: 8.92,
    change: -1.43,
    volume: 524_000_000,
    volumeLabel: "524M",
    marketCap: null,
    high24h: 9.30,
    low24h: 8.80,
    spark: [9.30, 9.10, 9.00, 9.10, 8.90, 8.95, 8.92],
    category: "layer-1",
  },
];

// ==========================================================================
// 4. SIGNAL FEED
// ==========================================================================

export const MARKET_SIGNALS = [
  {
    id: "sig-btc-001",
    symbol: "BTC",
    pair: "BTC/USDT",
    name: "Bitcoin",
    tagline: "Potential bullish momentum continuation",
    direction: "bullish",
    strategy: "momentum",
    timeframe: "1H",
    status: "watching",
    priority: "high",
    lastPrice: 67234.50,
    changePercent: 2.34,
    confidence: null,
    source: "mock",

    entryZone: { low: 66800, high: 67000 },
    stopLoss: 66400,
    targets: [68000, 68500, 69000],
    riskReward: 2.5,

    summary:
      "Price is approaching a potential continuation area after an upward move.",

    analysis: {
      trend: "bullish",
      marketStructure: "Potential higher highs and higher lows",
      rationale: [
        "Recent price movement is upward.",
        "Price is approaching the proposed entry zone.",
        "Breakout and volume confirmation are still required.",
      ],
      confirmation: [
        "Wait for a confirmed candle close.",
        "Check volume against recent average volume.",
        "Verify the setup on the higher timeframe.",
      ],
      invalidation:
        "Reassess if price breaks the predefined structural level.",
      risks: [
        "False breakout",
        "Volatility spike",
        "Unfavourable execution costs",
      ],
    },
  },

  {
    id: "sig-eth-002",
    symbol: "ETH",
    pair: "ETH/USDT",
    name: "Ethereum",
    tagline: "Watching for a resistance rejection",
    direction: "bearish",
    strategy: "snr",
    timeframe: "30M",
    status: "watching",
    priority: "medium",
    lastPrice: 3842.18,
    changePercent: 1.87,
    confidence: null,
    source: "mock",

    entryZone: { low: 3860, high: 3880 },
    stopLoss: 3910,
    targets: [3800, 3760, 3720],
    riskReward: null,

    summary:
      "A possible resistance reaction is being monitored; rejection is not confirmed.",

    analysis: {
      trend: "undetermined",
      marketStructure: "Resistance test pending confirmation",
      rationale: [
        "Price is approaching an illustrative resistance zone.",
        "A rejection candle could provide additional evidence.",
        "The wider market structure must also be checked.",
      ],
      confirmation: [
        "Wait for a rejection candle to close.",
        "Check the 1H and 4H structure.",
        "Recalculate risk and reward before entry.",
      ],
      invalidation:
        "A sustained move above resistance would weaken the bearish thesis.",
      risks: [
        "Resistance breakout",
        "Countertrend entry",
        "Slippage",
      ],
    },
  },

  {
    id: "sig-sol-003",
    symbol: "SOL",
    pair: "SOL/USDT",
    name: "Solana",
    tagline: "Monitoring downside momentum",
    direction: "bearish",
    strategy: "momentum",
    timeframe: "1H",
    status: "watching",
    priority: "medium",
    lastPrice: 187.43,
    changePercent: -0.92,
    confidence: null,
    source: "mock",

    entryZone: { low: 187, high: 189 },
    stopLoss: 191,
    targets: [184, 181, 178],
    riskReward: null,

    summary:
      "Recent movement is negative, but a trade requires further confirmation.",

    analysis: {
      trend: "bearish",
      marketStructure: "Potential short-term weakness",
      rationale: [
        "The supplied sample price series has declined overall.",
        "A lower-timeframe entry trigger has not been verified.",
      ],
      confirmation: [
        "Check whether price forms a lower high.",
        "Confirm the relevant support break.",
        "Evaluate the higher-timeframe trend.",
      ],
      invalidation:
        "Reassess if the bearish structure fails.",
      risks: [
        "Support bounce",
        "Short squeeze",
        "Low-volume price movement",
      ],
    },
  },

  {
    id: "sig-avax-004",
    symbol: "AVAX",
    pair: "AVAX/USDT",
    name: "Avalanche",
    tagline: "Potential breakout continuation",
    direction: "bullish",
    strategy: "breakout",
    timeframe: "4H",
    status: "watching",
    priority: "medium",
    lastPrice: 38.74,
    changePercent: 3.21,
    confidence: null,
    source: "mock",

    entryZone: { low: 38.00, high: 38.50 },
    stopLoss: 37.20,
    targets: [40.00, 41.00, 42.00],
    riskReward: null,

    summary:
      "An upward move is visible in the sample data; breakout validity remains untested.",

    analysis: {
      trend: "bullish",
      marketStructure: "Potential resistance breakout",
      rationale: [
        "The sample price series is rising overall.",
        "A confirmed close above resistance would be relevant.",
      ],
      confirmation: [
        "Confirm a candle close above resistance.",
        "Compare breakout volume with the recent baseline.",
        "Check whether price holds the broken level.",
      ],
      invalidation:
        "A failed breakout and return below the zone require reassessment.",
      risks: [
        "Breakout failure",
        "Extended entry",
        "Volatility",
      ],
    },
  },
];

// ==========================================================================
// 5. PRICE HISTORY FOR MINI LINE CHARTS
// ==========================================================================

export const PRICE_HISTORY = {
  "BTC/USDT": [
    { time: "09:00", price: 66120 },
    { time: "10:00", price: 66480 },
    { time: "11:00", price: 66290 },
    { time: "12:00", price: 66820 },
    { time: "13:00", price: 66550 },
    { time: "14:00", price: 67100 },
    { time: "15:00", price: 67234.50 },
  ],

  "ETH/USDT": [
    { time: "09:00", price: 3760 },
    { time: "10:00", price: 3795 },
    { time: "11:00", price: 3780 },
    { time: "12:00", price: 3810 },
    { time: "13:00", price: 3802 },
    { time: "14:00", price: 3830 },
    { time: "15:00", price: 3842.18 },
  ],

  "SOL/USDT": [
    { time: "09:00", price: 190.20 },
    { time: "10:00", price: 189.10 },
    { time: "11:00", price: 191.00 },
    { time: "12:00", price: 188.60 },
    { time: "13:00", price: 187.90 },
    { time: "14:00", price: 186.80 },
    { time: "15:00", price: 187.43 },
  ],

  "AVAX/USDT": [
    { time: "09:00", price: 35.00 },
    { time: "10:00", price: 36.00 },
    { time: "11:00", price: 37.00 },
    { time: "12:00", price: 36.50 },
    { time: "13:00", price: 37.50 },
    { time: "14:00", price: 38.00 },
    { time: "15:00", price: 38.74 },
  ],

  "DOT/USDT": [
    { time: "09:00", price: 9.30 },
    { time: "10:00", price: 9.10 },
    { time: "11:00", price: 9.00 },
    { time: "12:00", price: 9.10 },
    { time: "13:00", price: 8.90 },
    { time: "14:00", price: 8.95 },
    { time: "15:00", price: 8.92 },
  ],
};

// ==========================================================================
// 6. SIGNAL DISTRIBUTION FOR PIE CHARTS
// ==========================================================================

export const SIGNAL_DISTRIBUTION = {
  "BTC/USDT": [
    { name: "Bullish", value: 60, color: "#22c55e" },
    { name: "Bearish", value: 25, color: "#ef4444" },
    { name: "Neutral", value: 15, color: "#64748b" },
  ],

  "ETH/USDT": [
    { name: "Bullish", value: 50, color: "#22c55e" },
    { name: "Bearish", value: 30, color: "#ef4444" },
    { name: "Neutral", value: 20, color: "#64748b" },
  ],

  "SOL/USDT": [
    { name: "Bullish", value: 25, color: "#22c55e" },
    { name: "Bearish", value: 55, color: "#ef4444" },
    { name: "Neutral", value: 20, color: "#64748b" },
  ],

  "AVAX/USDT": [
    { name: "Bullish", value: 55, color: "#22c55e" },
    { name: "Bearish", value: 25, color: "#ef4444" },
    { name: "Neutral", value: 20, color: "#64748b" },
  ],
};

// ==========================================================================
// 7. TECHNICAL INDICATOR DISPLAY CONFIGURATION
// ==========================================================================

export const INDICATORS = [
  {
    id: "ema20",
    name: "EMA 20",
    category: "trend",
    enabledByDefault: true,
    description: "Short-term exponential moving average",
  },
  {
    id: "ema50",
    name: "EMA 50",
    category: "trend",
    enabledByDefault: true,
    description: "Medium-term exponential moving average",
  },
  {
    id: "ema200",
    name: "EMA 200",
    category: "trend",
    enabledByDefault: false,
    description: "Long-term trend reference",
  },
  {
    id: "rsi",
    name: "RSI",
    category: "momentum",
    enabledByDefault: true,
    description: "Relative Strength Index",
  },
  {
    id: "macd",
    name: "MACD",
    category: "momentum",
    enabledByDefault: false,
    description: "Moving Average Convergence Divergence",
  },
  {
    id: "volume",
    name: "Volume",
    category: "volume",
    enabledByDefault: true,
    description: "Traded volume per candle",
  },
];

// ==========================================================================
// 8. SUPPORT AND RESISTANCE LEVELS
// ==========================================================================

export const TECHNICAL_LEVELS = {
  "BTC/USDT": {
    support: [
      { price: 66000, strength: "major", timeframe: "4H" },
      { price: 65200, strength: "minor", timeframe: "1H" },
    ],
    resistance: [
      { price: 68000, strength: "major", timeframe: "4H" },
      { price: 69000, strength: "major", timeframe: "1D" },
    ],
  },

  "ETH/USDT": {
    support: [
      { price: 3760, strength: "major", timeframe: "4H" },
      { price: 3720, strength: "minor", timeframe: "1H" },
    ],
    resistance: [
      { price: 3880, strength: "major", timeframe: "4H" },
      { price: 3950, strength: "minor", timeframe: "1D" },
    ],
  },

  "SOL/USDT": {
    support: [
      { price: 184, strength: "major", timeframe: "4H" },
      { price: 181, strength: "minor", timeframe: "1H" },
    ],
    resistance: [
      { price: 191, strength: "major", timeframe: "4H" },
      { price: 195, strength: "minor", timeframe: "1D" },
    ],
  },
};

// ==========================================================================
// 9. MARKET SENTIMENT
// ==========================================================================

export const MARKET_SENTIMENT = {
  label: "Mixed",
  score: null,
  components: [
    { name: "Trend", value: null },
    { name: "Momentum", value: null },
    { name: "Volume", value: null },
    { name: "Market Structure", value: null },
  ],
  note:
    "Sentiment scores must be calculated from real market data before display.",
};

// ==========================================================================
// 10. RISK DISPLAY SETTINGS
// ==========================================================================

export const RISK_SETTINGS = {
  defaultRiskPercent: 1,
  maxRiskPercent: 2,
  rewardRiskTargets: [1, 2, 3],
  showPositionSizing: true,
  showStopLoss: true,
  showTakeProfit: true,
  showRiskReward: true,
};

// ==========================================================================
// 11. DASHBOARD NAVIGATION
// ==========================================================================

export const MARKET_TABS = [
  { label: "Overview", value: "overview" },
  { label: "Signals", value: "signals" },
  { label: "Technical Analysis", value: "technical" },
  { label: "Market Sentiment", value: "sentiment" },
];

// ==========================================================================
// 12. DISPLAY HELPERS
// ==========================================================================

export const formatPrice = (price) => {
  if (price == null || !Number.isFinite(Number(price))) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Number(price) < 1 ? 5 : 2,
  }).format(Number(price));
};

export const formatPercent = (value) => {
  if (value == null || !Number.isFinite(Number(value))) {
    return "—";
  }

  const number = Number(value);

  return `${number > 0 ? "+" : ""}${number.toFixed(2)}%`;
};

export const getSignalColor = (direction) => {
  const colors = {
    bullish: "#22c55e",
    bearish: "#ef4444",
    neutral: "#64748b",
  };

  return colors[direction] ?? colors.neutral;
};

export const getSignalById = (id) =>
  MARKET_SIGNALS.find((signal) => signal.id === id) ?? null;

export const getAssetBySymbol = (symbol) =>
  CRYPTO_ASSETS.find(
    (asset) => asset.symbol === symbol ||
      asset.pair === symbol
  ) ?? null;

export const getSignalsByDirection = (direction) =>
  MARKET_SIGNALS.filter(
    (signal) => signal.direction === direction
  );
