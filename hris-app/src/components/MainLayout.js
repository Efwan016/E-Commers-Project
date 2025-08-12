import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Header onToggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", marginTop: "60px" }}>
        {sidebarOpen && (
          <Sidebar onLinkClick={() => setSidebarOpen(false)} />
        )}
        <main style={{ flex: 1, padding: "20px" }}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
