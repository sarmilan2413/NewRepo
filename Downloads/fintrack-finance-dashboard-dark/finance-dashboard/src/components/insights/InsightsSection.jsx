import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useInsights } from "../../hooks/useFinance";
import { formatCurrency } from "../../utils/helpers";

const PANEL = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(15,22,40,0.97)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px" }}>
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: "flex", gap: 8, fontSize: 12, alignItems: "center" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.fill, display: "inline-block" }} />
          <span style={{ color: "rgba(255,255,255,0.4)", textTransform: "capitalize" }}>{p.name}:</span>
          <span style={{ color: "#fff", fontWeight: 600 }}>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function InsightCard({ icon, title, value, sub, gradient, glow }) {
  return (
    <div className="rounded-2xl p-5 text-white relative overflow-hidden"
      style={{ background: gradient, boxShadow: `0 8px 32px ${glow}` }}>
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="text-2xl mb-3 relative">{icon}</div>
      <p className="text-xs font-semibold uppercase tracking-wider mb-1 relative" style={{ opacity: 0.65 }}>{title}</p>
      <p className="text-xl font-bold relative">{value}</p>
      {sub && <p className="text-xs mt-1 relative" style={{ opacity: 0.55 }}>{sub}</p>}
    </div>
  );
}

export default function InsightsSection() {
  const { highestCategory, savingsRate, bestMonth, worstMonth, monthly } = useInsights();

  if (!monthly.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-4xl mb-3">📊</p>
        <p style={{ color: "rgba(255,255,255,0.35)" }}>No data to analyze yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InsightCard icon="🏆" title="Highest Spending Category"
          value={highestCategory?.name || "—"}
          sub={highestCategory ? formatCurrency(highestCategory.value) + " total" : "No data"}
          gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
          glow="rgba(245,158,11,0.35)"
        />
        <InsightCard icon="💰" title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          sub={savingsRate >= 20 ? "✓ Healthy saving habit" : "Consider saving more"}
          gradient={savingsRate >= 20
            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
            : "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)"}
          glow={savingsRate >= 20 ? "rgba(16,185,129,0.35)" : "rgba(239,68,68,0.35)"}
        />
        <InsightCard icon="📅" title="Best Month"
          value={bestMonth?.label || "—"}
          sub={bestMonth ? `Net +${formatCurrency(bestMonth.net)}` : "No data"}
          gradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
          glow="rgba(99,102,241,0.35)"
        />
      </div>

      <div className="rounded-2xl p-5" style={PANEL}>
        <div className="mb-4">
          <h2 className="font-bold text-white text-base">Monthly Income vs Expenses</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Side-by-side comparison per month</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthly} barCategoryGap="30%" barGap={4} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" name="income" fill="#10b981" radius={[4,4,0,0]} />
            <Bar dataKey="expenses" name="expenses" fill="#ef4444" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 justify-center" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#10b981", display: "inline-block" }} /> Income</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#ef4444", display: "inline-block" }} /> Expenses</span>
        </div>
      </div>

      {worstMonth && (
        <div className="rounded-2xl p-5" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <h2 className="font-bold text-white text-sm mb-1">⚠️ Watch Out</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
            Your highest spending month was <span style={{ color: "#fff", fontWeight: 600 }}>{worstMonth.label}</span> with{" "}
            <span style={{ color: "#f87171", fontWeight: 600 }}>{formatCurrency(worstMonth.expenses)}</span> in expenses
            against <span style={{ color: "#10b981", fontWeight: 600 }}>{formatCurrency(worstMonth.income)}</span> income.{" "}
            {worstMonth.expenses > worstMonth.income
              ? "This resulted in a net deficit — consider budget controls."
              : "You still maintained a positive balance — well done!"}
          </p>
        </div>
      )}
    </div>
  );
}
