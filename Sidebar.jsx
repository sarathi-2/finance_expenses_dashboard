import {
  LayoutDashboard,
  Receipt,
  ArrowLeftRight,
  WalletCards,
  Settings,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

function Sidebar({ isOpen, closeSidebar }) {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <Receipt size={20} />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <ArrowLeftRight size={20} />,
    },
    {
      name: "Budget",
      path: "/budget",
      icon: <WalletCards size={20} />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">₹</div>

          <div>
            <h2>FinTrack</h2>
            <span>Finance Manager</span>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={closeSidebar}
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <p className="nav-title">MAIN MENU</p>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Settings */}
          <p className="nav-title settings-title">
            SETTINGS
          </p>

          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-item settings-button ${
                isActive ? "active" : ""
              }`
            }
          >
            
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Bottom Card */}
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>

            <h4>Manage your money</h4>

            <p>
              Track your spending and reach your
              financial goals.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;