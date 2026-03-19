import { useState, useEffect, useMemo } from 'react'
import Sidebar         from './components/Sidebar'
import KpiCard         from './components/KpiCard'
import EquityChart     from './components/EquityChart'
import AllocationChart from './components/AllocationChart'
import PositionsTable  from './components/PositionsTable'
import { EQUITY_CURVE, ALLOCATIONS, POSITIONS } from './data/mockData'
import { computeKpis, fmt } from './utils/finance'
import './styles/shared.css'
import './App.css'

export default function App() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // ← PLUG IN: replace EQUITY_CURVE with fetched data (useEffect + fetch/WebSocket)
  const kpis = useMemo(() => computeKpis(EQUITY_CURVE), [])

  const KPI_CARDS = [
    {
      label: 'PORTFOLIO VALUE',
      value: fmt.usd(kpis.val),
      sub:   `${fmt.usd(kpis.dpnl)} today`,
      pos:   kpis.dpnl >= 0,
      accent: '#3b82f6',
      icon:  '◈',
    },
    {
      label: 'DAILY P&L',
      value: fmt.usd(kpis.dpnl),
      sub:   `${((kpis.dpnl / kpis.val) * 100).toFixed(3)}% of NAV`,
      pos:   kpis.dpnl >= 0,
      accent: kpis.dpnl >= 0 ? '#10b981' : '#f87171',
      icon:  '◎',
    },
    {
      label: 'MAX DRAWDOWN',
      value: `${kpis.mdd.toFixed(2)}%`,
      sub:   'Peak-to-trough',
      pos:   false,
      accent: '#f59e0b',
      icon:  '◫',
    },
    {
      label: 'SHARPE RATIO',
      value: kpis.sharpe.toFixed(2),
      sub:   'Ann. · rf = 0',
      pos:   kpis.sharpe >= 1,
      accent: '#8b5cf6',
      icon:  '◉',
    },
  ]

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <span className="tb-label">OVERVIEW</span>
          <div className="tb-right">
            <span className="tb-date">
              {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <span className="tb-time">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </span>
            <div className="tb-divider" />
            <div className="live-badge">
              <div className="live-dot" />
              MOCK
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="body">
          {/* KPIs */}
          <div className="kpis">
            {KPI_CARDS.map(k => <KpiCard key={k.label} {...k} />)}
          </div>

          {/* Charts */}
          <div className="charts-row">
            <EquityChart data={EQUITY_CURVE} />
            <AllocationChart data={ALLOCATIONS} />
          </div>

          {/* Table */}
          <PositionsTable positions={POSITIONS} />
        </div>
      </div>
    </div>
  )
}
