import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip
} from "recharts";
import { useChartData } from "../../hooks/useFinance";
import { formatCurrency } from "../../utils/helpers";

const PANEL = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(15,22,40,0.95)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px" }}>
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.stroke, display: "inline-block" }} />
          <span style={{ color: "rgba(255,255,255,0.5)", textTransform: "capitalize" }}>{p.name}:</span>
          <span style={{ color: "#fff", fontWeight: 600 }}>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function BalanceChart() {
  const { monthly } = useChartData();

  return (
    <div className="rounded-2xl p-5" style={{ ...PANEL }}>
      <div className="mb-1">
        <h2 className="font-bold text-white text-base">Financial Overview</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Income vs Expenses (Last 6 Months)</p>
      </div>
      <div className="mb-4 flex items-center gap-4 mt-3">
        {[
          { label: "Income", color: "#10b981" },
          { label: "Expenses", color: "#ef4444" },
          { label: "Balance", color: "#6366f1" },
        ].map(l => (
          <span key={l.label} style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, display: "inline-block" }} />
            {l.label}
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={monthly} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="incG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="balG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2.5} fill="url(#incG)" name="income" dot={false} />
          <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fill="url(#expG)" name="expenses" dot={false} />
          <Area type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={2} fill="url(#balG)" name="balance" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
