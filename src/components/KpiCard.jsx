export default function KpiCard({ label, value, sub, pos, accent, icon }) {
  return (
    <div className="kpi">
      <div className="kpi-bar" style={{ background: accent }} />
      <div className="kpi-row">
        <span className="kpi-lbl">{label}</span>
        <div className="kpi-icon" style={{ background: accent + '22' }}>
          <span style={{ color: accent }}>{icon}</span>
        </div>
      </div>
      <div className="kpi-val">{value}</div>
      {sub && <div className={`kpi-sub ${pos ? 'pos' : 'neg'}`}>{sub}</div>}
    </div>
  )
}
