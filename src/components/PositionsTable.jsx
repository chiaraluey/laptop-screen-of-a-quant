import { useState, useMemo } from 'react'
import { fmt, pnlClass } from '../utils/finance'

// ← PLUG IN: map `positions` prop from broker API or backtest engine
export default function PositionsTable({ positions }) {
  const [sortKey, setSortKey] = useState('upnl')
  const [sortDir, setSortDir] = useState(-1)

  const rows = useMemo(() => {
    const enriched = positions.map(p => {
      const m = p.side === 'LONG' ? 1 : -1
      return {
        ...p,
        upnl: (p.current - p.entry) * p.qty * m,
        ret:  ((p.current - p.entry) / p.entry) * m * 100,
      }
    })
    return [...enriched].sort((a, b) => (a[sortKey] - b[sortKey]) * sortDir)
  }, [positions, sortKey, sortDir])

  const setSort = k => () => {
    setSortKey(k)
    setSortDir(d => sortKey === k ? -d : -1)
  }
  const arrow = k => sortKey === k ? (sortDir > 0 ? ' ↑' : ' ↓') : ''

  const totalUpnl = rows.reduce((s, r) => s + r.upnl, 0)
  const avgRet    = rows.reduce((s, r) => s + r.ret, 0) / rows.length

  return (
    <div className="table-card">
      <div className="table-head">
        <span style={{ color: '#f59e0b', fontSize: 12 }}>▤</span>
        <span className="card-title">OPEN POSITIONS</span>
        <span className="card-meta" style={{ marginLeft: 'auto' }}>{positions.length} POSITIONS</span>
      </div>
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th className="tl">TICKER</th>
              <th className="tl">SIDE</th>
              <th onClick={setSort('qty')}>QTY{arrow('qty')}</th>
              <th onClick={setSort('entry')}>ENTRY{arrow('entry')}</th>
              <th onClick={setSort('current')}>LAST{arrow('current')}</th>
              <th onClick={setSort('upnl')}>uPNL{arrow('upnl')}</th>
              <th onClick={setSort('ret')}>RET%{arrow('ret')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(p => (
              <tr key={p.ticker}>
                <td className="tl">{p.ticker}</td>
                <td className="tl">
                  <span className={p.side === 'LONG' ? 'side-long' : 'side-short'}>{p.side}</span>
                </td>
                <td>{p.qty.toLocaleString()}</td>
                <td style={{ color: '#64748b' }}>{fmt.price(p.entry)}</td>
                <td style={{ color: '#e2e8f0' }}>{fmt.price(p.current)}</td>
                <td className={pnlClass(p.upnl)} style={{ fontWeight: 600 }}>{fmt.usd(p.upnl)}</td>
                <td className={pnlClass(p.ret)}>{fmt.pct(p.ret)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="mu">TOTAL uPNL</td>
              <td className={pnlClass(totalUpnl)} style={{ fontWeight: 700, fontSize: 10 }}>{fmt.usd(totalUpnl)}</td>
              <td className={pnlClass(avgRet)} style={{ fontSize: 10 }}>{fmt.pct(avgRet)} avg</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
