import './Sidebar.css'

const NAV = [
  { icon: '◈', label: 'OVERVIEW',   active: true  },
  { icon: '◎', label: 'BACKTEST',   active: false },
  { icon: '◫', label: 'STRATEGIES', active: false },
  { icon: '▤', label: 'REPORTS',    active: false },
  { icon: '◉', label: 'RISK',       active: false },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="sb-name">QUANT·DESK</div>
        <div className="sb-sub">PORTFOLIO INTELLIGENCE</div>
      </div>
      <nav className="sb-nav">
        {NAV.map(({ icon, label, active }) => (
          <div key={label} className={`nav-item${active ? ' active' : ''}`}>
            <span>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </nav>
      <div className="sb-foot">
        <div className="status-dot" />
        <span className="status-txt">LIVE · MOCK FEED</span>
      </div>
    </aside>
  )
}
