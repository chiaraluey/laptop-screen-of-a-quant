// ============================================================
//  DATA MODULE
//  Replace these exports with real data sources:
//    - EQUITY_CURVE : fetch from your backtest API / CSV
//    - ALLOCATIONS  : fetch from broker portfolio endpoint
//    - POSITIONS    : fetch from broker positions endpoint
// ============================================================

// ← PLUG IN: replace with your backtest equity curve [{date, value}]
export const EQUITY_CURVE = (() => {
  let v = 100_000
  return Array.from({ length: 126 }, (_, i) => {
    const d = new Date('2024-01-02')
    d.setDate(d.getDate() + i)
    v = Math.max(v + (Math.random() - 0.46) * 1_400, 70_000)
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(v),
    }
  })
})()

// ← PLUG IN: replace with live allocation weights [{name, value, color}]
export const ALLOCATIONS = [
  { name: 'US Equities',   value: 38, color: '#3b82f6' },
  { name: 'Fixed Income',  value: 22, color: '#10b981' },
  { name: 'International', value: 16, color: '#f59e0b' },
  { name: 'Commodities',   value: 11, color: '#8b5cf6' },
  { name: 'Cash',          value:  8, color: '#6b7280' },
  { name: 'Alternatives',  value:  5, color: '#ec4899' },
]

// ← PLUG IN: replace with positions from broker API or backtest engine
export const POSITIONS = [
  { ticker: 'NVDA',  side: 'LONG',  qty: 120, entry: 487.20, current: 621.50 },
  { ticker: 'MSFT',  side: 'LONG',  qty: 85,  entry: 310.40, current: 378.90 },
  { ticker: 'TSLA',  side: 'SHORT', qty: 60,  entry: 252.10, current: 183.70 },
  { ticker: 'GLD',   side: 'LONG',  qty: 200, entry: 182.30, current: 179.10 },
  { ticker: 'SPY',   side: 'LONG',  qty: 150, entry: 450.00, current: 512.40 },
  { ticker: 'QQQ',   side: 'LONG',  qty: 75,  entry: 365.80, current: 430.20 },
  { ticker: 'TLT',   side: 'SHORT', qty: 110, entry: 98.60,  current: 94.20  },
  { ticker: 'AMZN',  side: 'LONG',  qty: 45,  entry: 172.00, current: 188.50 },
  { ticker: 'AMD',   side: 'LONG',  qty: 95,  entry: 145.30, current: 167.80 },
  { ticker: 'XOM',   side: 'SHORT', qty: 70,  entry: 115.50, current: 108.90 },
]
