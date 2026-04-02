import { useSummary } from "../../hooks/useFinance";
import { formatCurrency } from "../../utils/helpers";

const CARDS = [
  {
    key: "balance",
    title: "Total Balance",
    change: +12.5,
    icon: "💳",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    glow: "rgba(59,130,246,0.4)",
  },
  {
    key: "income",
    title: "Total Income",
    change: +8.2,
    icon: "📈",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    glow: "rgba(16,185,129,0.4)",
  },
  {
    key: "expenses",
    title: "Total Expenses",
    change: -3.1,
    icon: "📉",
    gradient: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
    glow: "rgba(239,68,68,0.4)",
  },
  {
    key: "savings",
    title: "Savings Rate",
    change: +2.4,
    icon: "🏦",
    gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    glow: "rgba(168,85,247,0.4)",
  },
];

function StatCard({ title, value, change, icon, gradient, glow }) {
  const positive = change >= 0;
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 text-white cursor-default"
      style={{
        background: gradient,
        boxShadow: `0 8px 32px ${glow}, 0 2px 8px rgba(0,0,0,0.4)`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${glow}, 0 4px 12px rgba(0,0,0,0.4)`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 32px ${glow}, 0 2px 8px rgba(0,0,0,0.4)`; }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
      <div className="absolute -bottom-8 -left-2 w-20 h-20 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Top: icon + badge */}
      <div className="relative flex items-start justify-between mb-5">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(255,255,255,0.2)" }}>
          {icon}
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: positive ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}>
          {positive ? "+" : ""}{change.toFixed(1)}%
        </span>
      </div>

      {/* Text */}
      <div className="relative">
        <p className="text-sm font-medium mb-1" style={{ opacity: 0.85 }}>{title}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}

export default function SummaryCards() {
  const { income, expenses, balance } = useSummary();
  const savingsRate = income > 0 ? ((income - expenses) / income * 100) : 0;

  const values = {
    balance: formatCurrency(balance),
    income: formatCurrency(income),
    expenses: formatCurrency(expenses),
    savings: `${savingsRate.toFixed(0)}%`,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {CARDS.map(card => (
        <StatCard key={card.key} title={card.title} value={values[card.key]} change={card.change} icon={card.icon} gradient={card.gradient} glow={card.glow} />
      ))}
    </div>
  );
}
