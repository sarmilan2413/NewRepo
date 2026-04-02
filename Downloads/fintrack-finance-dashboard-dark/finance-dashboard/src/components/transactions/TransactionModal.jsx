import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../data/mockData";
import { generateId } from "../../utils/helpers";

const EMPTY = { date: "", description: "", amount: "", category: "", type: "expense" };

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: 13,
  outline: "none",
};

export default function TransactionModal({ transaction, onClose }) {
  const { dispatch } = useApp();
  const isEdit = !!transaction;
  const [form, setForm] = useState(isEdit ? { ...transaction, amount: String(transaction.amount) } : { ...EMPTY, date: new Date().toISOString().split("T")[0] });
  const [errors, setErrors] = useState({});

  const categories = form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  useEffect(() => {
    if (!categories.includes(form.category)) setForm(f => ({ ...f, category: "" }));
  }, [form.type]);

  function validate() {
    const e = {};
    if (!form.date) e.date = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = "Must be > 0";
    if (!form.category) e.category = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const txn = { ...form, amount: Number(form.amount), id: isEdit ? transaction.id : generateId() };
    dispatch({ type: isEdit ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload: txn });
    onClose();
  }

  const label = (text) => <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{text}</label>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} />
      <div className="relative w-full max-w-md animate-in" onClick={e => e.stopPropagation()}
        style={{ background: "linear-gradient(135deg, #0f1628 0%, #1a2340 100%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}>
        
        <div className="flex items-center justify-between px-6 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <h2 className="font-bold text-white text-base">{isEdit ? "Edit Transaction" : "Add Transaction"}</h2>
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.4)", fontSize: 20, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          {/* Type toggle */}
          <div style={{ marginBottom: 20 }}>
            {label("Type")}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 4, gap: 4 }}>
              {["expense", "income"].map(t => (
                <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                  style={{
                    flex: 1, padding: "8px 0", borderRadius: 9, fontSize: 13, fontWeight: 600,
                    border: "none", cursor: "pointer", transition: "all 0.15s",
                    background: form.type === t
                      ? (t === "income" ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#ef4444,#b91c1c)")
                      : "transparent",
                    color: form.type === t ? "#fff" : "rgba(255,255,255,0.35)",
                  }}>
                  {t === "income" ? "↑ Income" : "↓ Expense"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              {label("Date")}
              <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ ...inputStyle, borderColor: errors.date ? "#ef4444" : "rgba(255,255,255,0.1)", colorScheme: "dark" }} />
              {errors.date && <p style={{ color: "#f87171", fontSize: 11, marginTop: 4 }}>{errors.date}</p>}
            </div>
            <div>
              {label("Amount ($)")}
              <input type="number" step="0.01" min="0" placeholder="0.00" value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                style={{ ...inputStyle, borderColor: errors.amount ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
              {errors.amount && <p style={{ color: "#f87171", fontSize: 11, marginTop: 4 }}>{errors.amount}</p>}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            {label("Description")}
            <input type="text" placeholder="e.g. Monthly rent payment" value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              style={{ ...inputStyle, borderColor: errors.description ? "#ef4444" : "rgba(255,255,255,0.1)" }} />
            {errors.description && <p style={{ color: "#f87171", fontSize: 11, marginTop: 4 }}>{errors.description}</p>}
          </div>

          <div style={{ marginBottom: 24 }}>
            {label("Category")}
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              style={{ ...inputStyle, cursor: "pointer", borderColor: errors.category ? "#ef4444" : "rgba(255,255,255,0.1)" }}>
              <option value="" style={{ background: "#1a2340" }}>Select category…</option>
              {categories.map(c => <option key={c} value={c} style={{ background: "#1a2340" }}>{c}</option>)}
            </select>
            {errors.category && <p style={{ color: "#f87171", fontSize: 11, marginTop: 4 }}>{errors.category}</p>}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button type="button" onClick={onClose}
              style={{ flex: 1, padding: "11px 0", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
              Cancel
            </button>
            <button type="submit"
              style={{ flex: 1, padding: "11px 0", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none", color: "#fff", boxShadow: "0 4px 16px rgba(99,102,241,0.4)" }}>
              {isEdit ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
