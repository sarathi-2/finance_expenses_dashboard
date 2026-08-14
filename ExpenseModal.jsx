import { useEffect, useState } from "react";
import { X } from "lucide-react";

import "./ExpenseModal.css";

function ExpenseModal({
  expense,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    payment: "UPI",
    status: "Completed",
  });

  const [errors, setErrors] = useState({});

  // Load existing expense when editing
  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title || "",
        category: expense.category || "",
        amount: expense.amount || "",
        date: expense.date || "",
        payment: expense.payment || "UPI",
        status: expense.status || "Completed",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        amount: "",
        date: new Date()
          .toISOString()
          .split("T")[0],
        payment: "UPI",
        status: "Completed",
      });
    }

    setErrors({});
  }, [expense]);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title =
        "Expense title is required.";
    }

    if (!formData.category) {
      newErrors.category =
        "Please select a category.";
    }

    if (!formData.amount) {
      newErrors.amount =
        "Amount is required.";
    } else if (
      Number(formData.amount) <= 0
    ) {
      newErrors.amount =
        "Amount must be greater than 0.";
    }

    if (!formData.date) {
      newErrors.date =
        "Please select a date.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const expenseData = {
      ...formData,
      amount: Number(formData.amount),
      ...(expense && {
        id: expense.id,
      }),
    };

    onSave(expenseData);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="expense-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* Header */}

        <div className="modal-header">
          <div>
            <h3>
              {expense
                ? "Edit Expense"
                : "Add Expense"}
            </h3>

            <p>
              {expense
                ? "Update your expense details"
                : "Enter your expense details"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>
          {/* Title */}

          <div className="form-group">
            <label htmlFor="title">
              Expense Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Grocery Shopping"
              value={formData.title}
              onChange={handleChange}
            />

            {errors.title && (
              <small>
                {errors.title}
              </small>
            )}
          </div>

          {/* Category + Amount */}

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select Category
                </option>

                <option value="Food">
                  Food
                </option>

                <option value="Shopping">
                  Shopping
                </option>

                <option value="Bills">
                  Bills
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Entertainment">
                  Entertainment
                </option>

                <option value="Health">
                  Health
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              {errors.category && (
                <small>
                  {errors.category}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="amount">
                Amount
              </label>

              <input
                id="amount"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
              />

              {errors.amount && (
                <small>
                  {errors.amount}
                </small>
              )}
            </div>

          </div>

          {/* Date + Payment */}

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="date">
                Date
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />

              {errors.date && (
                <small>
                  {errors.date}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="payment">
                Payment Method
              </label>

              <select
                id="payment"
                name="payment"
                value={formData.payment}
                onChange={handleChange}
              >
                <option value="UPI">
                  UPI
                </option>

                <option value="Card">
                  Card
                </option>

                <option value="Cash">
                  Cash
                </option>

                <option value="Bank">
                  Bank Transfer
                </option>
              </select>
            </div>

          </div>

          {/* Status */}

          <div className="form-group">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Completed">
                Completed
              </option>

              <option value="Pending">
                Pending
              </option>
            </select>
          </div>

          {/* Buttons */}

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
            >
              {expense
                ? "Update Expense"
                : "Save Expense"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default ExpenseModal;