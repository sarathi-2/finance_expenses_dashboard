import { useMemo, useState } from "react";

import {
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowUpDown,
} from "lucide-react";

import { transactionData } from "../data/dummyData";

import "./Transactions.css";

function Transactions() {
  const [transactions] =
    useState(transactionData);

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("All");

  const [sort, setSort] =
    useState("newest");

  const filteredTransactions =
    useMemo(() => {

      let result =
        transactions.filter(
          (transaction) => {

            const matchesSearch =
              transaction.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesType =
              type === "All" ||
              transaction.type === type;

            return (
              matchesSearch &&
              matchesType
            );
          }
        );

      result.sort((a, b) => {

        if (sort === "highest") {
          return b.amount - a.amount;
        }

        if (sort === "lowest") {
          return a.amount - b.amount;
        }

        if (sort === "oldest") {
          return (
            new Date(a.date) -
            new Date(b.date)
          );
        }

        return (
          new Date(b.date) -
          new Date(a.date)
        );
      });

      return result;

    }, [transactions, search, type, sort]);

  return (
    <div className="transactions-page">

      <div className="page-heading">

        <div>
          <h2>Transactions</h2>

          <p>
            View and manage all your financial
            transactions.
          </p>
        </div>

      </div>

      {/* Filters */}

      <div className="transaction-filters">

        <div className="search-box">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="All">
            All Transactions
          </option>

          <option value="Income">
            Income
          </option>

          <option value="Expense">
            Expenses
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="highest">
            Highest Amount
          </option>

          <option value="lowest">
            Lowest Amount
          </option>
        </select>

      </div>

      {/* Transaction List */}

      <div className="transactions-card">

        <div className="transactions-card-header">

          <div>
            <h3>Transaction History</h3>

            <p>
              {filteredTransactions.length}{" "}
              transactions found
            </p>
          </div>

          <ArrowUpDown size={18} />

        </div>

        <div className="table-wrapper">

          <table className="transactions-table">

            <thead>
              <tr>
                <th>Transaction</th>
                <th>Category</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredTransactions.map(
                (transaction) => {

                  const isIncome =
                    transaction.type ===
                    "Income";

                  return (
                    <tr
                      key={transaction.id}
                    >

                      <td>

                        <div className="transaction-name">

                          <div
                            className={
                              isIncome
                                ? "transaction-icon income"
                                : "transaction-icon expense"
                            }
                          >
                            {isIncome ? (
                              <ArrowDownLeft
                                size={17}
                              />
                            ) : (
                              <ArrowUpRight
                                size={17}
                              />
                            )}
                          </div>

                          <div>
                            <strong>
                              {transaction.title}
                            </strong>

                            <span>
                              {transaction.type}
                            </span>
                          </div>

                        </div>

                      </td>

                      <td>
                        {transaction.category}
                      </td>

                      <td>
                        {transaction.date}
                      </td>

                      <td>
                        {transaction.payment}
                      </td>

                      <td>

                        <span
                          className={
                            isIncome
                              ? "transaction-income"
                              : "transaction-expense"
                          }
                        >
                          {isIncome
                            ? "+"
                            : "-"}
                          ₹
                          {transaction.amount.toLocaleString()}
                        </span>

                      </td>

                      <td>
                        <span className="status-badge">
                          {transaction.status}
                        </span>
                      </td>

                    </tr>
                  );
                }
              )}

            </tbody>

          </table>

          {filteredTransactions.length ===
            0 && (
            <div className="empty-state">
              No transactions found.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Transactions;