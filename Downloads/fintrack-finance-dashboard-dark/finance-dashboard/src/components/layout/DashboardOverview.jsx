import SummaryCards from "../cards/SummaryCards";
import BalanceChart from "../charts/BalanceChart";
import SpendingChart from "../charts/SpendingChart";
import { useFilteredTransactions } from "../../hooks/useFinance";
import { useInsights } from "../../hooks/useFinance";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/mockData";

const PANEL = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };

function RecentTransaction({ t }) {
  return (
    <div className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
        style={{ background: t.type === "income" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.15)" }}>
        {t.type === "income" ? "↑" : "↓"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.85)" }}>{t.description}</p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{formatDate(t.date)} · {t.category}</p>
      </div>
      <span className="text-sm font-semibold whitespace-nowrap"
        style={{ color: t.type === "income" ? "#10b981" : "rgba(255,255,255,0.7)" }}>
        {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
      </span>
    </div>
  );
}

function QuickStats() {
  const { highestCategory, savingsRate, bestMonth } = useInsights();
  const all = useFilteredTransactions();
  const totalExpenses = all.filter(t => t.type === "expense").reduce((s,t) => s+t.amount, 0);
  const avgDaily = totalExpenses > 0 ? totalExpenses / 180 : 0;

  const stats = [
    { label: "Average Daily Spending", value: formatCurrency(avgDaily), color: "#6366f1" },
    { label: "Top Category", value: highestCategory?.name || "—", sub: highestCategory ? formatCurrency(highestCategory.value) + " spent" : "", color: "#10b981" },
    { label: "Best Month", value: bestMonth?.label || "—", sub: bestMonth ? `Net +${formatCurrency(bestMonth.net)}` : "", color: "#f59e0b" },
    { label: "Savings Rate", value: `${savingsRate.toFixed(1)}%`, color: "#a855f7" },
  ];

  return (
    <div className="rounded-2xl p-5" style={PANEL}>
      <div className="mb-4">
        <h2 className="font-bold text-white text-base">Quick Stats</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>This month's summary</p>
      </div>
      <div className="space-y-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 3 }}>{s.label}</p>
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            {s.sub && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{s.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardOverview() {
  const all = useFilteredTransactions();
  const recent = all.slice(0, 6);

  return (
    <div className="space-y-5">
      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        <div>
          <QuickStats />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="rounded-2xl p-5" style={PANEL}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-white text-base">Recent Transactions</h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Latest activity</p>
              </div>
            </div>
            {recent.length === 0 ? (
              <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "40px 0", fontSize: 13 }}>No transactions yet</p>
            ) : (
              <div>{recent.map(t => <RecentTransaction key={t.id} t={t} />)}</div>
            )}
          </div>
        </div>
        <div>
          <SpendingChart />
        </div>
      </div>
    </div>
  );
}
