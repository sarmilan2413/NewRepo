import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";

const inputStyle = {
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.7)",
  borderRadius: 10,
  padding: "7px 12px",
  fontSize: 13,
  outline: "none",
};

export default function FilterBar() {
  const { state, dispatch } = useApp();
  const { filters, sort } = state;

  const set = (payload) => dispatch({ type: "SET_FILTER", payload });
  const setSort = (field) => {
    const dir = sort.field === field && sort.dir === "desc" ? "asc" : "desc";
    dispatch({ type: "SET_SORT", payload: { field, dir } });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="relative flex-1 min-w-44">
        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>🔍</span>
        <input type="text" placeholder="Search..." value={filters.search}
          onChange={e => set({ search: e.target.value })}
          style={{ ...inputStyle, paddingLeft: 30, width: "100%" }}
          onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
      </div>
      <select value={filters.category} onChange={e => set({ category: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
        <option value="all" style={{ background: "#1a2340" }}>All Categories</option>
        {CATEGORIES.map(c => <option key={c} value={c} style={{ background: "#1a2340" }}>{c}</option>)}
      </select>
      <select value={filters.type} onChange={e => set({ type: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
        <option value="all" style={{ background: "#1a2340" }}>All Types</option>
        <option value="income" style={{ background: "#1a2340" }}>Income</option>
        <option value="expense" style={{ background: "#1a2340" }}>Expense</option>
      </select>
      {["date", "amount"].map(f => (
        <button key={f} onClick={() => setSort(f)}
          style={{
            borderRadius: 10, padding: "7px 12px", fontSize: 12, fontWeight: 500, cursor: "pointer",
            background: sort.field === f ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.07)",
            border: sort.field === f ? "none" : "1px solid rgba(255,255,255,0.1)",
            color: sort.field === f ? "#fff" : "rgba(255,255,255,0.5)",
          }}>
          {f.charAt(0).toUpperCase() + f.slice(1)} {sort.field === f ? (sort.dir === "desc" ? "↓" : "↑") : ""}
        </button>
      ))}
      {(filters.search || filters.category !== "all" || filters.type !== "all") && (
        <button onClick={() => dispatch({ type: "RESET_FILTERS" })}
          style={{ borderRadius: 10, padding: "7px 12px", fontSize: 12, cursor: "pointer", background: "transparent", border: "1px solid rgba(239,68,68,0.3)", color: "rgba(248,113,113,0.7)" }}>
          ✕ Clear
        </button>
      )}
    </div>
  );
}
