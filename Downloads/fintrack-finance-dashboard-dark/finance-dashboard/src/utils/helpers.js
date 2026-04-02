export function formatCurrency(amount, compact = false) {
  if (compact && amount >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD",
      notation: "compact", maximumFractionDigits: 1
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: 2
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });
}

export function generateId() {
  return `txn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function exportToCSV(transactions) {
  const headers = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map(t => [
    t.date, t.description, t.category, t.type, t.amount
  ]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  download(csv, "fintrack_export.csv", "text/csv");
}

export function exportToJSON(transactions) {
  download(JSON.stringify(transactions, null, 2), "fintrack_export.json", "application/json");
}

function download(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
