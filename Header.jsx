import {
  Menu,
  Bell,
  Search,
} from "lucide-react";

import "./Header.css";

function Header({ openSidebar }) {
  return (
    <header className="header">
      <div className="header-left">

        <button
          className="menu-button"
          onClick={openSidebar}
        >
          <Menu size={22} />
        </button>

        <div>
          <h1>Finance Dashboard</h1>

          <p>
            Manage your finances efficiently
          </p>
        </div>

      </div>

      <div className="header-right">

        <button className="header-icon">
          <Search size={19} />
        </button>

        <button className="header-icon notification">
          <Bell size={19} />
          <span />
        </button>

        <div className="profile">
          <div className="profile-avatar">
            S
          </div>

          <div className="profile-info">
            <strong>Admin</strong>
            <span>Personal Account</span>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;