import { Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Settings from "./pages/Settings/Settings";

// Layout
import DashboardLayout from "./components/Layout/DashboardLayout";

// Protected Route
import ProtectedRoute from "./components/Auth/ProtectedRoute";
localStorage.removeItem("fintrackUser");
function App() {
  return (
    <Routes>
       <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
      {/* Authentication Pages */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Protected Dashboard */}
      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/expenses"
            element={<Expenses />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/budget"
            element={<Budget />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Route>

    </Routes>
  );
}

export default App;