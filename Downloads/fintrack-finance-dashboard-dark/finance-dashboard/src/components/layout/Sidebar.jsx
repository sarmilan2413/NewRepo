import { useApp } from "../../context/AppContext";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "transactions", label: "Transactions", icon: "⇄" },
  { id: "insights", label: "Insights", icon: "◈" },
];

const PANEL = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

export default function Sidebar({ mobile, onClose }) {
  const { state, dispatch } = useApp();
  const { activeSection } = state;

  return (
    <aside className="flex flex-col h-full" style={{ background: "rgba(10,18,40,0.95)", borderRight: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          F
        </div>
        <span className="font-bold text-lg tracking-tight text-white">FinTrack</span>
        {mobile && (
          <button onClick={onClose} className="ml-auto text-gray-400 hover:text-white text-xl">✕</button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV_ITEMS.map(item => {
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { dispatch({ type: "SET_SECTION", payload: item.id }); if (onClose) onClose(); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={active ? {
                background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
                color: "#a5b4fc",
                border: "1px solid rgba(99,102,241,0.3)",
              } : {
                color: "rgba(255,255,255,0.45)",
                border: "1px solid transparent",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
            </button>
          );
        })}
      </nav>

      {/* Dark mode toggle */}
      <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <button
          onClick={() => dispatch({ type: "TOGGLE_DARK" })}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
        >
          <span className="text-xs font-medium">Toggle Theme</span>
          <span>🌙</span>
        </button>
      </div>
    </aside>
  );
}
