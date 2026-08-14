import { useMemo, useState } from "react";

import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Filter,
  WalletCards,
} from "lucide-react";

import ExpenseModal from "../components/Expenses/ExpenseModal";

import { expensesData } from "../data/dummyData";

import "./Expenses.css";

function Expenses() {
  const [expenses, setExpenses] =
    useState(expensesData);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [editingExpense, setEditingExpense] =
    useState(null);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {

      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        expense.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [expenses, search, category]);

  const handleAdd = () => {
    setEditingExpense(null);
    setShowModal(true);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this expense?"
      );

    if (!confirmed) return;

    setExpenses((prev) =>
      prev.filter(
        (expense) => expense.id !== id
      )
    );
  };

  const handleSave = (expense) => {

    if (expense.id) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === expense.id
            ? expense
            : item
        )
      );
    } else {
      setExpenses((prev) => [
        {
          ...expense,
          id: Date.now(),
        },
        ...prev,
      ]);
    }

    setShowModal(false);
    setEditingExpense(null);
  };

  const totalExpenses = filteredExpenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  return (
    <div className="expenses-page">

      {/* Header */}

      <div className="page-heading">

        <div>
          <h2>Expenses</h2>

          <p>
            Track and manage your daily expenses.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={handleAdd}
        >
          <Plus size={17} />
          Add Expense
        </button>

      </div>

      {/* Stats */}

      <div className="expense-summary">

        <div className="expense-summary-card">

          <div className="expense-summary-icon">
            <WalletCards size={20} />
          </div>

          <div>
            <span>Total Expenses</span>
            <strong>
              ₹{totalExpenses.toLocaleString()}
            </strong>
          </div>

        </div>

        <div className="expense-summary-card">

          <div className="expense-summary-icon">
            <Filter size={20} />
          </div>

          <div>
            <span>Transactions</span>
            <strong>
              {filteredExpenses.length}
            </strong>
          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="expense-toolbar">

        <div className="search-box">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Transport">
            Transport
          </option>

          <option value="Entertainment">
            Entertainment
          </option>
        </select>

      </div>

      {/* Table */}

      <div className="expense-table-card">

        <div className="table-wrapper">

          <table className="expense-table">

            <thead>
              <tr>
                <th>Expense</th>
                <th>Category</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredExpenses.map(
                (expense) => (
                  <tr key={expense.id}>

                    <td>
                      <div className="expense-name">
                        <div className="expense-avatar">
                          {expense.title
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <span>
                          {expense.title}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="category-badge">
                        {expense.category}
                      </span>
                    </td>

                    <td>
                      {expense.date}
                    </td>

                    <td>
                      {expense.payment}
                    </td>

                    <td className="expense-amount">
                      ₹
                      {Number(
                        expense.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      <span className="status-badge">
                        {expense.status}
                      </span>
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(expense)
                          }
                        >
                          <Edit3 size={15} />
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              expense.id
                            )
                          }
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {filteredExpenses.length === 0 && (
            <div className="empty-state">
              No expenses found.
            </div>
          )}

        </div>

      </div>

      {/* Modal */}

      {showModal && (
        <ExpenseModal
          expense={editingExpense}
          onClose={() => {
            setShowModal(false);
            setEditingExpense(null);
          }}
          onSave={handleSave}
        />
      )}

    </div>
  );
}

export default Expenses;