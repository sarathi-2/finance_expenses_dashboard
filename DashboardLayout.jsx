import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />

      <div className="main-area">

        <Header
          onMenuClick={openSidebar}
        />

        <main className="main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;