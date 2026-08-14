import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import "./ExpenseChart.css";

function ExpenseChart({
  monthlyData = [],
  categoryData = [],
}) {
  const chartColors = [
    "#6366f1",
    "#f97316",
    "#22c55e",
    "#06b6d4",
    "#ec4899",
  ];

  return (
    <div className="charts-container">

      <div className="chart-card">

        <div className="chart-header">
          <div>
            <h3>Income & Expenses</h3>
            <p>
              Monthly financial overview
            </p>
          </div>

          <select defaultValue="2026">
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={monthlyData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="income"
              name="Income"
              fill="#6366f1"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="expense"
              name="Expense"
              fill="#f97316"
              radius={[5, 5, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <div className="chart-header">
          <div>
            <h3>Expense Categories</h3>
            <p>
              Where your money goes
            </p>
          </div>
        </div>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>

            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={90}
              innerRadius={55}
              paddingAngle={3}
            >
              {categoryData.map(
                (item, index) => (
                  <Cell
                    key={item.name}
                    fill={
                      chartColors[
                        index %
                          chartColors.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ExpenseChart;