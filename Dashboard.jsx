import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";

import SummaryCard from "../components/Cards/SummaryCard";
import ExpenseChart from "../components/Charts/ExpenseChart";
import BudgetCard from "../components/Budget/BudgetCard";

import {
  summaryData,
  monthlyData,
  categoryData,
} from "../data/dummyData";

import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Page Header */}

      <div className="page-heading">

        <div>
          <h2>Overview</h2>

          <p>
            Here's what's happening with your money.
          </p>
        </div>

        

      </div>

      {/* Summary Cards */}

      <div className="summary-grid">

        <SummaryCard
          title="Total Income"
          amount={`₹${summaryData.income.toLocaleString()}`}
          icon={<TrendingUp size={20} />}
          percentage="+12.5%"
          type="income"
        />

        <SummaryCard
          title="Total Expenses"
          amount={`₹${summaryData.expenses.toLocaleString()}`}
          icon={<TrendingDown size={20} />}
          percentage="-8.2%"
          type="expense"
        />

        <SummaryCard
          title="Available Balance"
          amount={`₹${summaryData.balance.toLocaleString()}`}
          icon={<Wallet size={20} />}
          percentage="+10.4%"
          type="balance"
        />

        <SummaryCard
          title="Total Savings"
          amount={`₹${summaryData.savings.toLocaleString()}`}
          icon={<PiggyBank size={20} />}
          percentage="+15.8%"
          type="savings"
        />

      </div>

      {/* Main Grid */}

      <div className="dashboard-main-grid">

        <div className="dashboard-chart-wrapper">
          <ExpenseChart
            monthlyData={monthlyData}
            categoryData={categoryData}
          />
        </div>

        <BudgetCard
          budget={50000}
          spent={32500}
        />

      </div>

      {/* Quick Statistics */}

      <div className="quick-stats">

        <div className="quick-stat-card">
          <div className="quick-stat-icon income-icon">
            <ArrowUpRight size={20} />
          </div>

          <div>
            <span>Highest Income</span>
            <strong>₹85,000</strong>
            <small>This month</small>
          </div>
        </div>

        <div className="quick-stat-card">
          <div className="quick-stat-icon expense-icon">
            <ArrowDownRight size={20} />
          </div>

          <div>
            <span>Highest Expense</span>
            <strong>₹4,500</strong>
            <small>Shopping</small>
          </div>
        </div>

        <div className="quick-stat-card">
          <div className="quick-stat-icon saving-icon">
            <PiggyBank size={20} />
          </div>

          <div>
            <span>Saving Rate</span>
            <strong>26.4%</strong>
            <small>Above last month</small>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;