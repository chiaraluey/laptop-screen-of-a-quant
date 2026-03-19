// ← PLUG IN: swap computeKpis with outputs from your risk engine
export function computeKpis(curve) {
  const val  = curve[curve.length - 1].value
  const prev = curve[curve.length - 2].value
  const dpnl = val - prev

  let peak = -Infinity, mdd = 0
  for (const { value } of curve) {
    if (value > peak) peak = value
    const dd = (value - peak) / peak
    if (dd < mdd) mdd = dd
  }

  const rets = curve.slice(1).map((p, i) => (p.value - curve[i].value) / curve[i].value)
  const mean = rets.reduce((a, b) => a + b, 0) / rets.length
  const std  = Math.sqrt(rets.map(r => (r - mean) ** 2).reduce((a, b) => a + b, 0) / rets.length)
  const sharpe = (mean / std) * Math.sqrt(252)

  return { val, dpnl, mdd: mdd * 100, sharpe }
}

export const fmt = {
  usd:   v => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v),
  pct:   v => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`,
  price: v => `$${v.toFixed(2)}`,
}

export const pnlClass = v => v >= 0 ? 'pos' : 'neg'
