import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import DashboardOverview from "./components/layout/DashboardOverview";
import TransactionsTable from "./components/transactions/TransactionsTable";
import InsightsSection from "./components/insights/InsightsSection";

function AppContent() {
  const { state } = useApp();
  const { activeSection } = state;

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ background: "linear-gradient(135deg, #0f1628 0%, #1a2340 50%, #0f1628 100%)" }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-5">
          <div className="max-w-7xl mx-auto">
            {activeSection === "dashboard" && <DashboardOverview />}
            {activeSection === "transactions" && <TransactionsTable />}
            {activeSection === "insights" && <InsightsSection />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
