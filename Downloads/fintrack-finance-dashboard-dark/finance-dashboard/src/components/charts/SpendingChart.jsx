import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useChartData } from "../../hooks/useFinance";
import { formatCurrency } from "../../utils/helpers";

const PANEL = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{ background: "rgba(15,22,40,0.95)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px" }}>
      <p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{d.name}</p>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{formatCurrency(d.value)}</p>
    </div>
  );
}

export default function SpendingChart() {
  const { spending } = useChartData();
  const total = spending.reduce((s, d) => s + d.value, 0);
  const top5 = spending.slice(0, 5);
  const otherTotal = spending.slice(5).reduce((s, d) => s + d.value, 0);
  const chartData = otherTotal > 0 ? [...top5, { name: "Other", value: otherTotal, color: "#475569" }] : top5;

  if (!spending.length) {
    return (
      <div className="rounded-2xl p-5 flex items-center justify-center min-h-64" style={PANEL}>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>No spending data</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-5" style={PANEL}>
      <div className="mb-4">
        <h2 className="font-bold text-white text-base">Spending by Category</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Breakdown of all expenses</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={46} outerRadius={64} paddingAngle={3} dataKey="value">
                {chartData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Total</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{formatCurrency(total, true)}</p>
          </div>
        </div>

        <div className="w-full mt-4 space-y-2">
          {chartData.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", flex: 1 }} className="truncate">{d.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="h-full rounded-full" style={{ width: `${total > 0 ? (d.value/total*100) : 0}%`, background: d.color }} />
                </div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", width: 30, textAlign: "right" }}>
                  {total > 0 ? (d.value/total*100).toFixed(0) : 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
