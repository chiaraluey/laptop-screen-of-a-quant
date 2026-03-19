import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const CustomTip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, padding: '5px 9px', fontSize: 10 }}>
      <span style={{ color: payload[0].payload.color, fontWeight: 600 }}>{payload[0].name}</span>
      <span style={{ color: '#94a3b8', marginLeft: 6 }}>{payload[0].value}%</span>
    </div>
  )
}

// ← PLUG IN: swap `data` prop with live portfolio weights [{name, value, color}]
export default function AllocationChart({ data }) {
  const [active, setActive] = useState(null)

  return (
    <div className="chart-card">
      <div className="card-head">
        <span style={{ fontSize: 11, color: '#8b5cf6' }}>◉</span>
        <span className="card-title">ALLOCATION</span>
        <span className="card-meta">BY CLASS</span>
      </div>

      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data} cx="50%" cy="50%"
            innerRadius={40} outerRadius={62}
            paddingAngle={2} dataKey="value"
            onMouseEnter={(_, i) => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.name}
                fill={entry.color}
                opacity={active === null || active === i ? 1 : 0.3}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTip />} />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px', marginTop: 8 }}>
        {data.map(d => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 8, color: '#64748b' }}>
            <div style={{ width: 7, height: 7, borderRadius: 2, background: d.color, flexShrink: 0 }} />
            <span>{d.name}</span>
            <span style={{ marginLeft: 'auto', color: '#94a3b8' }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
