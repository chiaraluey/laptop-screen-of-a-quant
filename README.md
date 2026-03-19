# Quant Desk — Portfolio Dashboard

A quant finance dashboard built with React + Recharts. Dark terminal aesthetic with live P&L, equity curve, allocation breakdown, and sortable positions table.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Project Structure

```
src/
├── data/
│   └── mockData.js          ← swap with real data here
├── utils/
│   └── finance.js           ← KPI math + formatters
├── components/
│   ├── KpiCard.jsx
│   ├── EquityChart.jsx
│   ├── AllocationChart.jsx
│   ├── PositionsTable.jsx
│   ├── Sidebar.jsx
│   └── Sidebar.css
├── styles/
│   └── shared.css
├── App.jsx
├── App.css
└── main.jsx
```

## Plugging In Real Data

Search for `← PLUG IN` comments throughout the codebase. The three main swap points are:

1. **`src/data/mockData.js`** — replace `EQUITY_CURVE`, `ALLOCATIONS`, and `POSITIONS` with fetched data
2. **`src/App.jsx`** — add a `useEffect` to fetch from your API or broker
3. **`src/utils/finance.js`** — replace `computeKpis()` with your risk engine outputs

### Example: loading from an API

```js
// In App.jsx
const [curve, setCurve] = useState([])

useEffect(() => {
  fetch('/api/equity-curve')
    .then(r => r.json())
    .then(setCurve)
}, [])
```

## Tech Stack

- React 18
- Recharts 2
- Vite 5
- Plain CSS (no Tailwind dependency)
