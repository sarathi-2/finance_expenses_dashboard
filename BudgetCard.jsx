import { Target } from "lucide-react";
import "./BudgetCard.css";

function BudgetCard({
  budget = 50000,
  spent = 32500,
}) {
  const percentage =
    budget > 0
      ? Math.min(
          Math.round((spent / budget) * 100),
          100
        )
      : 0;

  const remaining = Math.max(
    budget - spent,
    0
  );

  return (
    <div className="budget-card">

      <div className="budget-header">

        <div>
          <h3>Monthly Budget</h3>
          <p>August 2026</p>
        </div>

        <div className="budget-icon">
          <Target size={21} />
        </div>

      </div>

      <div className="budget-amount">
        <strong>
          ₹{spent.toLocaleString()}
        </strong>

        <span>
          {" "}
          / ₹{budget.toLocaleString()}
        </span>
      </div>

      <div className="progress-track">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="budget-info">
        <span>{percentage}% used</span>

        <span>
          ₹{remaining.toLocaleString()} left
        </span>
      </div>

      <div className="budget-message">
        <strong>
          {percentage >= 80
            ? "Watch your spending!"
            : "You're doing great!"}
        </strong>

        <p>
          You have ₹
          {remaining.toLocaleString()} remaining
          this month.
        </p>
      </div>

    </div>
  );
}

export default BudgetCard;