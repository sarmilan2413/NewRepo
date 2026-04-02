import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { computeMonthlyData, computeSpendingByCategory } from "../data/mockData";

export function useFilteredTransactions() {
  const { state } = useApp();
  const { transactions, filters, sort } = state;

  return useMemo(() => {
    let list = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        String(t.amount).includes(q)
      );
    }
    if (filters.category !== "all") {
      list = list.filter(t => t.category === filters.category);
    }
    if (filters.type !== "all") {
      list = list.filter(t => t.type === filters.type);
    }

    list.sort((a, b) => {
      let cmp = 0;
      if (sort.field === "date") cmp = a.date.localeCompare(b.date);
      if (sort.field === "amount") cmp = a.amount - b.amount;
      return sort.dir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [transactions, filters, sort]);
}

export function useSummary() {
  const { state } = useApp();
  const { transactions } = state;

  return useMemo(() => {
    const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);
}

export function useChartData() {
  const { state } = useApp();
  return useMemo(() => ({
    monthly: computeMonthlyData(state.transactions),
    spending: computeSpendingByCategory(state.transactions),
  }), [state.transactions]);
}

export function useInsights() {
  const { state } = useApp();
  const { transactions } = state;

  return useMemo(() => {
    const monthly = computeMonthlyData(transactions);
    const spending = computeSpendingByCategory(transactions);

    const highestCategory = spending[0] || null;

    // Avg savings rate
    const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    // Best month (highest net)
    let bestMonth = null;
    monthly.forEach(m => {
      const net = m.income - m.expenses;
      if (!bestMonth || net > bestMonth.net) bestMonth = { ...m, net };
    });

    // Month with highest spending
    let worstMonth = null;
    monthly.forEach(m => {
      if (!worstMonth || m.expenses > worstMonth.expenses) worstMonth = { ...m };
    });

    return { highestCategory, savingsRate, bestMonth, worstMonth, monthly };
  }, [transactions]);
}
