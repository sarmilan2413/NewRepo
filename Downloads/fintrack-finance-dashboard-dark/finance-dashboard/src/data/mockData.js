export const CATEGORIES = [
  "Housing", "Food & Dining", "Transportation", "Healthcare",
  "Entertainment", "Shopping", "Utilities", "Education",
  "Travel", "Investments", "Salary", "Freelance", "Dividends", "Other"
];

export const EXPENSE_CATEGORIES = [
  "Housing", "Food & Dining", "Transportation", "Healthcare",
  "Entertainment", "Shopping", "Utilities", "Education", "Travel", "Other"
];

export const INCOME_CATEGORIES = ["Salary", "Freelance", "Dividends", "Other"];

export const CATEGORY_COLORS = {
  "Housing": "#6366f1",
  "Food & Dining": "#f59e0b",
  "Transportation": "#10b981",
  "Healthcare": "#ef4444",
  "Entertainment": "#8b5cf6",
  "Shopping": "#ec4899",
  "Utilities": "#14b8a6",
  "Education": "#f97316",
  "Travel": "#06b6d4",
  "Investments": "#84cc16",
  "Salary": "#22c55e",
  "Freelance": "#a3e635",
  "Dividends": "#4ade80",
  "Other": "#94a3b8",
};

let idCounter = 1;
const makeId = () => `txn_${String(idCounter++).padStart(4, "0")}`;

function makeDate(year, month, day) {
  return new Date(year, month - 1, day).toISOString().split("T")[0];
}

export const initialTransactions = [
  // January
  { id: makeId(), date: makeDate(2024, 1, 1),  description: "Monthly Salary",         amount: 5800, category: "Salary",          type: "income" },
  { id: makeId(), date: makeDate(2024, 1, 3),  description: "Rent Payment",            amount: 1500, category: "Housing",         type: "expense" },
  { id: makeId(), date: makeDate(2024, 1, 5),  description: "Grocery Store",           amount: 210,  category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 1, 8),  description: "Netflix Subscription",    amount: 15,   category: "Entertainment",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 1, 10), description: "Freelance Project",       amount: 1200, category: "Freelance",       type: "income" },
  { id: makeId(), date: makeDate(2024, 1, 12), description: "Electricity Bill",        amount: 95,   category: "Utilities",       type: "expense" },
  { id: makeId(), date: makeDate(2024, 1, 15), description: "Restaurant Dinner",       amount: 78,   category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 1, 18), description: "Gym Membership",          amount: 45,   category: "Healthcare",      type: "expense" },
  { id: makeId(), date: makeDate(2024, 1, 20), description: "Amazon Shopping",         amount: 134,  category: "Shopping",        type: "expense" },
  { id: makeId(), date: makeDate(2024, 1, 22), description: "Uber Rides",              amount: 62,   category: "Transportation",  type: "expense" },
  { id: makeId(), date: makeDate(2024, 1, 25), description: "Online Course",           amount: 199,  category: "Education",       type: "expense" },
  { id: makeId(), date: makeDate(2024, 1, 28), description: "Dividend Payment",        amount: 320,  category: "Dividends",       type: "income" },
  // February
  { id: makeId(), date: makeDate(2024, 2, 1),  description: "Monthly Salary",         amount: 5800, category: "Salary",          type: "income" },
  { id: makeId(), date: makeDate(2024, 2, 3),  description: "Rent Payment",            amount: 1500, category: "Housing",         type: "expense" },
  { id: makeId(), date: makeDate(2024, 2, 6),  description: "Grocery Store",           amount: 195,  category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 2, 9),  description: "Spotify Premium",         amount: 10,   category: "Entertainment",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 2, 11), description: "Doctor Visit",            amount: 150,  category: "Healthcare",      type: "expense" },
  { id: makeId(), date: makeDate(2024, 2, 14), description: "Valentine's Dinner",      amount: 120,  category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 2, 16), description: "Freelance Project",       amount: 850,  category: "Freelance",       type: "income" },
  { id: makeId(), date: makeDate(2024, 2, 18), description: "Gas Bill",                amount: 88,   category: "Utilities",       type: "expense" },
  { id: makeId(), date: makeDate(2024, 2, 20), description: "Clothing Purchase",       amount: 230,  category: "Shopping",        type: "expense" },
  { id: makeId(), date: makeDate(2024, 2, 22), description: "Bus Pass",                amount: 45,   category: "Transportation",  type: "expense" },
  { id: makeId(), date: makeDate(2024, 2, 25), description: "Book Purchase",           amount: 55,   category: "Education",       type: "expense" },
  // March
  { id: makeId(), date: makeDate(2024, 3, 1),  description: "Monthly Salary",         amount: 5800, category: "Salary",          type: "income" },
  { id: makeId(), date: makeDate(2024, 3, 2),  description: "Rent Payment",            amount: 1500, category: "Housing",         type: "expense" },
  { id: makeId(), date: makeDate(2024, 3, 5),  description: "Grocery Store",           amount: 245,  category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 3, 8),  description: "Flight Tickets",          amount: 480,  category: "Travel",          type: "expense" },
  { id: makeId(), date: makeDate(2024, 3, 10), description: "Freelance Project",       amount: 2100, category: "Freelance",       type: "income" },
  { id: makeId(), date: makeDate(2024, 3, 12), description: "Internet Bill",           amount: 60,   category: "Utilities",       type: "expense" },
  { id: makeId(), date: makeDate(2024, 3, 15), description: "Restaurant Lunch",        amount: 42,   category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 3, 18), description: "Pharmacy",                amount: 38,   category: "Healthcare",      type: "expense" },
  { id: makeId(), date: makeDate(2024, 3, 20), description: "Electronics Purchase",    amount: 399,  category: "Shopping",        type: "expense" },
  { id: makeId(), date: makeDate(2024, 3, 22), description: "Taxi",                    amount: 35,   category: "Transportation",  type: "expense" },
  { id: makeId(), date: makeDate(2024, 3, 25), description: "Dividend Payment",        amount: 320,  category: "Dividends",       type: "income" },
  { id: makeId(), date: makeDate(2024, 3, 28), description: "Concert Tickets",         amount: 145,  category: "Entertainment",   type: "expense" },
  // April
  { id: makeId(), date: makeDate(2024, 4, 1),  description: "Monthly Salary",         amount: 5800, category: "Salary",          type: "income" },
  { id: makeId(), date: makeDate(2024, 4, 3),  description: "Rent Payment",            amount: 1500, category: "Housing",         type: "expense" },
  { id: makeId(), date: makeDate(2024, 4, 5),  description: "Grocery Store",           amount: 185,  category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 4, 8),  description: "Health Insurance",        amount: 220,  category: "Healthcare",      type: "expense" },
  { id: makeId(), date: makeDate(2024, 4, 10), description: "Freelance Project",       amount: 1500, category: "Freelance",       type: "income" },
  { id: makeId(), date: makeDate(2024, 4, 12), description: "Water Bill",              amount: 42,   category: "Utilities",       type: "expense" },
  { id: makeId(), date: makeDate(2024, 4, 15), description: "Sushi Restaurant",        amount: 95,   category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 4, 18), description: "Bike Maintenance",        amount: 80,   category: "Transportation",  type: "expense" },
  { id: makeId(), date: makeDate(2024, 4, 20), description: "Home Decor",              amount: 310,  category: "Shopping",        type: "expense" },
  { id: makeId(), date: makeDate(2024, 4, 22), description: "Udemy Course",            amount: 89,   category: "Education",       type: "expense" },
  { id: makeId(), date: makeDate(2024, 4, 25), description: "Movie Night",             amount: 28,   category: "Entertainment",   type: "expense" },
  // May
  { id: makeId(), date: makeDate(2024, 5, 1),  description: "Monthly Salary",         amount: 5800, category: "Salary",          type: "income" },
  { id: makeId(), date: makeDate(2024, 5, 3),  description: "Rent Payment",            amount: 1500, category: "Housing",         type: "expense" },
  { id: makeId(), date: makeDate(2024, 5, 5),  description: "Grocery Store",           amount: 220,  category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 5, 8),  description: "Hotel Booking",           amount: 650,  category: "Travel",          type: "expense" },
  { id: makeId(), date: makeDate(2024, 5, 10), description: "Freelance Project",       amount: 1800, category: "Freelance",       type: "income" },
  { id: makeId(), date: makeDate(2024, 5, 12), description: "Electricity Bill",        amount: 110,  category: "Utilities",       type: "expense" },
  { id: makeId(), date: makeDate(2024, 5, 15), description: "Brunch",                  amount: 55,   category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 5, 18), description: "Dentist",                 amount: 180,  category: "Healthcare",      type: "expense" },
  { id: makeId(), date: makeDate(2024, 5, 20), description: "Sports Gear",             amount: 275,  category: "Shopping",        type: "expense" },
  { id: makeId(), date: makeDate(2024, 5, 22), description: "Fuel",                    amount: 70,   category: "Transportation",  type: "expense" },
  { id: makeId(), date: makeDate(2024, 5, 25), description: "Dividend Payment",        amount: 320,  category: "Dividends",       type: "income" },
  { id: makeId(), date: makeDate(2024, 5, 28), description: "Gaming Subscription",     amount: 15,   category: "Entertainment",   type: "expense" },
  // June
  { id: makeId(), date: makeDate(2024, 6, 1),  description: "Monthly Salary",         amount: 6200, category: "Salary",          type: "income" },
  { id: makeId(), date: makeDate(2024, 6, 3),  description: "Rent Payment",            amount: 1500, category: "Housing",         type: "expense" },
  { id: makeId(), date: makeDate(2024, 6, 5),  description: "Grocery Store",           amount: 200,  category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 6, 8),  description: "Summer Vacation Flight",  amount: 820,  category: "Travel",          type: "expense" },
  { id: makeId(), date: makeDate(2024, 6, 10), description: "Freelance Project",       amount: 950,  category: "Freelance",       type: "income" },
  { id: makeId(), date: makeDate(2024, 6, 12), description: "Gas Bill",                amount: 75,   category: "Utilities",       type: "expense" },
  { id: makeId(), date: makeDate(2024, 6, 15), description: "Cafe & Lunch",            amount: 68,   category: "Food & Dining",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 6, 18), description: "Eye Checkup",             amount: 100,  category: "Healthcare",      type: "expense" },
  { id: makeId(), date: makeDate(2024, 6, 20), description: "Summer Clothes",          amount: 340,  category: "Shopping",        type: "expense" },
  { id: makeId(), date: makeDate(2024, 6, 22), description: "Car Rental",              amount: 190,  category: "Transportation",  type: "expense" },
  { id: makeId(), date: makeDate(2024, 6, 25), description: "Music Concert",           amount: 95,   category: "Entertainment",   type: "expense" },
  { id: makeId(), date: makeDate(2024, 6, 28), description: "Dividend Payment",        amount: 320,  category: "Dividends",       type: "income" },
];

export function computeMonthlyData(transactions) {
  const months = {};
  transactions.forEach(t => {
    const [year, month] = t.date.split("-");
    const key = `${year}-${month}`;
    if (!months[key]) months[key] = { month: key, income: 0, expenses: 0, balance: 0 };
    if (t.type === "income") months[key].income += t.amount;
    else months[key].expenses += t.amount;
  });
  const sorted = Object.values(months).sort((a, b) => a.month.localeCompare(b.month));
  let running = 0;
  sorted.forEach(m => {
    running += m.income - m.expenses;
    m.balance = running;
    m.label = new Date(m.month + "-01").toLocaleString("default", { month: "short", year: "2-digit" });
  });
  return sorted;
}

export function computeSpendingByCategory(transactions) {
  const cats = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    cats[t.category] = (cats[t.category] || 0) + t.amount;
  });
  return Object.entries(cats)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || "#94a3b8" }))
    .sort((a, b) => b.value - a.value);
}
