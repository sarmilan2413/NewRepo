import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useFilteredTransactions } from "../../hooks/useFinance";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { CATEGORY_COLORS } from "../../data/mockData";
import FilterBar from "./FilterBar";
import TransactionModal from "./TransactionModal";
import { exportToCSV, exportToJSON } from "../../utils/helpers";

const PANEL = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };
const PAGE_SIZE = 10;

export default function TransactionsTable() {
  const { state, dispatch } = useApp();
  const { role } = state;
  const filtered = useFilteredTransactions();
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function deleteTransaction(id) {
    if (window.confirm("Delete this transaction?")) dispatch({ type: "DELETE_TRANSACTION", payload: id });
  }

  const btnStyle = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.6)",
    borderRadius: 10,
    padding: "6px 14px",
    fontSize: 12,
    cursor: "pointer",
    transition: "all 0.15s",
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={PANEL}>
      {/* Header */}
      <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div>
          <h2 className="font-bold text-white text-base">All Transactions</h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <button style={btnStyle}>↓ Export</button>
            <div className="absolute right-0 top-full mt-1 rounded-xl py-1 z-10 hidden group-hover:block min-w-24"
              style={{ background: "rgba(15,22,40,0.98)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
              <button onClick={() => exportToCSV(filtered)} className="block w-full text-left px-4 py-2 text-xs hover:bg-white/5" style={{ color: "rgba(255,255,255,0.6)" }}>CSV</button>
              <button onClick={() => exportToJSON(filtered)} className="block w-full text-left px-4 py-2 text-xs hover:bg-white/5" style={{ color: "rgba(255,255,255,0.6)" }}>JSON</button>
            </div>
          </div>
          {role === "admin" && (
            <button onClick={() => setModal("add")}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.1)" }}>
        <FilterBar />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {paged.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>No transactions found</p>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginTop: 4 }}>Try adjusting your filters</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Date", "Description", "Category", "Type", "Amount", role === "admin" && "Actions"].filter(Boolean).map(h => (
                  <th key={h} className="px-5 py-3 text-left" style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map(t => (
                <tr key={t.id} className="group" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td className="px-5 py-3.5" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>{formatDate(t.date)}</td>
                  <td className="px-5 py-3.5" style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.description}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLORS[t.category] || "#94a3b8" }} />
                      {t.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={t.type === "income"
                        ? { background: "rgba(16,185,129,0.15)", color: "#10b981" }
                        : { background: "rgba(239,68,68,0.12)", color: "#f87171" }}>
                      {t.type === "income" ? "↑" : "↓"} {t.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5" style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", color: t.type === "income" ? "#10b981" : "rgba(255,255,255,0.75)" }}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  {role === "admin" && (
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setModal(t)} className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                          style={{ color: "#a5b4fc", background: "rgba(99,102,241,0.15)" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.3)"}
                          onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.15)"}>Edit</button>
                        <button onClick={() => deleteTransaction(t.id)} className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                          style={{ color: "#f87171", background: "rgba(239,68,68,0.1)" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.25)"}
                          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}>Del</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Page {page} of {totalPages}</p>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ ...btnStyle, opacity: page === 1 ? 0.3 : 1 }}>← Prev</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              return (
                <button key={p} onClick={() => setPage(p)}
                  style={{ width: 32, height: 32, borderRadius: 8, fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer",
                    background: page === p ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.06)",
                    color: page === p ? "#fff" : "rgba(255,255,255,0.4)" }}>
                  {p}
                </button>
              );
            })}
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} style={{ ...btnStyle, opacity: page === totalPages ? 0.3 : 1 }}>Next →</button>
          </div>
        </div>
      )}

      {modal && <TransactionModal transaction={modal === "add" ? null : modal} onClose={() => setModal(null)} />}
    </div>
  );
}
