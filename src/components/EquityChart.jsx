import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { fmt } from '../utils/finance'

const CustomTip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, padding: '6px 10px', fontSize: 10 }}>
      <div style={{ color: '#475569', marginBottom: 2 }}>{payload[0].payload.date}</div>
      <div style={{ color: '#34d399', fontWeight: 600 }}>{fmt.usd(payload[0].payload.value)}</div>
    </div>
  )
}

// ← PLUG IN: swap `data` prop with your backtest equity series [{date, value}]
export default function EquityChart({ data }) {
  const thinned = data.filter((_, i) => i % 18 === 0 || i === data.length - 1)
  const minV = Math.min(...data.map(d => d.value)) * 0.995
  const maxV = Math.max(...data.map(d => d.value)) * 1.005

  return (
    <div className="chart-card">
      <div className="card-head">
        <span style={{ fontSize: 11, color: '#3b82f6' }}>◈</span>
        <span className="card-title">EQUITY CURVE</span>
        <span className="card-meta">YTD · MOCK</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 2, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis
            dataKey="date"
            ticks={thinned.map(d => d.date)}
            tick={{ fill: '#334155', fontSize: 8, fontFamily: 'monospace' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            domain={[minV, maxV]}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fill: '#334155', fontSize: 8, fontFamily: 'monospace' }}
            axisLine={false} tickLine={false} width={38}
          />
          <Tooltip content={<CustomTip />} />
          <Line
            type="monotone" dataKey="value"
            stroke="#3b82f6" strokeWidth={1.5}
            dot={false} activeDot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
