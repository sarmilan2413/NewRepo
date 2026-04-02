import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useSummary } from "../../hooks/useFinance";
import { formatCurrency } from "../../utils/helpers";
import Sidebar from "./Sidebar";

const SECTION_TITLES = {
  dashboard: { title: "Finance Dashboard", sub: "Welcome back, Alex" },
  transactions: { title: "Transactions", sub: "Manage your records" },
  insights: { title: "Financial Insights", sub: "Your money at a glance" },
};

export default function Topbar() {
  const { state, dispatch } = useApp();
  const { role, activeSection } = state;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { balance } = useSummary();
  const { title, sub } = SECTION_TITLES[activeSection];

  return (
    <>
      <header
        className="sticky top-0 z-30 px-4 md:px-6 py-3 flex items-center gap-4"
        style={{
          background: "rgba(10,18,40,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(true)} className="md:hidden flex flex-col gap-1 p-1">
          <span className="w-5 h-0.5 rounded" style={{ background: "rgba(255,255,255,0.6)" }} />
          <span className="w-5 h-0.5 rounded" style={{ background: "rgba(255,255,255,0.6)" }} />
          <span className="w-5 h-0.5 rounded" style={{ background: "rgba(255,255,255,0.6)" }} />
        </button>

        {/* Title */}
        <div className="flex-1">
          <h1 className="text-base md:text-lg font-bold text-white">{title}</h1>
          <p className="text-xs hidden sm:block" style={{ color: "rgba(255,255,255,0.4)" }}>{sub}</p>
        </div>

        {/* Search bar (decorative, like the image) */}
        <div
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)", minWidth: 200 }}
        >
          <span>🔍</span>
          <span>Search transactions...</span>
        </div>

        {/* Role switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.07)" }}>
          {["viewer", "admin"].map(r => (
            <button
              key={r}
              onClick={() => dispatch({ type: "SET_ROLE", payload: r })}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200"
              style={role === r ? {
                background: r === "admin" ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.15)",
                color: "#fff",
              } : {
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {r === "admin" ? "⚡ Admin" : "👁 Viewer"}
            </button>
          ))}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          AK
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 z-10">
            <Sidebar mobile onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
