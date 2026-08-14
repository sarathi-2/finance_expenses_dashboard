import { useState } from "react";

import {
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import BudgetCard from "../components/Budget/BudgetCard";

import { budgetData } from "../data/dummyData";

import "./Budget.css";

function Budget() {
  const [budget, setBudget] =
    useState(budgetData.budget);

  const [spent] =
    useState(budgetData.spent);

  const remaining =
    Math.max(budget - spent, 0);

  const percentage =
    budget > 0
      ? Math.min(
          Math.round(
            (spent / budget) * 100
          ),
          100
        )
      : 0;

  const handleBudgetChange = (e) => {
    const value =
      Number(e.target.value);

    setBudget(
      value >= 0 ? value : 0
    );
  };

  return (
    <div className="budget-page">

      {/* Header */}

      <div className="page-heading">

        <div>
          <h2>Budget</h2>

          <p>
            Plan your spending and stay on track.
          </p>
        </div>

      </div>

      {/* Main Budget */}

      <div className="budget-layout">

        <BudgetCard
          budget={budget}
          spent={spent}
        />

        <div className="budget-settings-card">

          <div className="budget-card-heading">

            <div className="heading-icon">
              <Target size={19} />
            </div>

            <div>
              <h3>Set Monthly Budget</h3>

              <p>
                Adjust your monthly spending limit.
              </p>
            </div>

          </div>

          <label>
            Monthly Budget
          </label>

          <div className="budget-input">

            <span>₹</span>

            <input
              type="number"
              min="0"
              value={budget}
              onChange={
                handleBudgetChange
              }
            />

          </div>

          <button
            className="budget-save-btn"
            type="button"
          >
            Save Budget
          </button>

        </div>

      </div>

      {/* Budget Statistics */}

      <div className="budget-stat-grid">

        <div className="budget-stat-card">

          <div className="stat-icon blue">
            <Target size={20} />
          </div>

          <span>Total Budget</span>

          <strong>
            ₹{budget.toLocaleString()}
          </strong>

        </div>

        <div className="budget-stat-card">

          <div className="stat-icon red">
            <TrendingUp size={20} />
          </div>

          <span>Total Spent</span>

          <strong>
            ₹{spent.toLocaleString()}
          </strong>

        </div>

        <div className="budget-stat-card">

          <div className="stat-icon green">
            <CheckCircle2 size={20} />
          </div>

          <span>Remaining</span>

          <strong>
            ₹{remaining.toLocaleString()}
          </strong>

        </div>

        <div className="budget-stat-card">

          <div className="stat-icon orange">
            <AlertCircle size={20} />
          </div>

          <span>Budget Used</span>

          <strong>
            {percentage}%
          </strong>

        </div>

      </div>

      {/* Tips */}

      <div className="budget-tips">

        <div className="tip-icon">
          💡
        </div>

        <div>
          <h3>Budget Tip</h3>

          <p>
            Try to keep your expenses below
            80% of your monthly budget so you
            have enough room for unexpected
            expenses.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Budget;