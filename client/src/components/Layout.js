import React, { useState } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import logo from "../images/logo.png";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successful");
    navigate("/login");
  };

  const doctorMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main">
      <div className="layout">
        <div className={`header-sidebar ${isSidebarOpen ? "open" : ""}`}>
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="Logo" className="logo-img" />
            </div>
          </Link>
          <div className="menu">
            {SidebarMenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={index}
                  className={`menu-item ${isActive ? "active" : ""}`}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-item" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header-content">
            <div className="notifications">
              {user && user.notification && (
                <Badge
                  count={user.notification.length}
                  onClick={() => navigate("/notification")}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
              )}
            </div>
            <div className="user-profile">
              <Link to="/profile" className="user-name">
                {user?.name}
              </Link>
            </div>
            <div className="hamburger" onClick={toggleSidebar}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="body">{children}</div>

          <footer className="footer">
            <div className="footer-content">
              <p>
                &copy; {new Date().getFullYear()} DoctorPro. All Rights
                Reserved.
              </p>
              <div className="footer-links">
                <Link to="#">Privacy Policy</Link> |{" "}
                <Link to="#">Terms of Service</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
