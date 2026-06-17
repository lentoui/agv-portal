import { NavLink } from "react-router-dom";
import { hasRole } from "../utils/auth";

export default function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const navClass = ({ isActive }) =>
    isActive ? "sidebar-link active-link" : "sidebar-link";

  return (
    <div className="bg-success text-white sidebar vh-100">

        {/* ✅ LOGO */}
      <NavLink to="/dashboard" className="sidebar-logo">
  <img src="/logo.png" className="sidebar-logo-img" alt="AGV Logo" />
</NavLink>

      <ul className="nav flex-column mt-4">

        {/* ✅ DASHBOARD */}
        <li>
          <NavLink to="/dashboard" className={navClass} title="Dashboard">
            <i className="bi bi-speedometer2"></i>
          </NavLink>
        </li>

        {/* ✅ FLOOD */}
        <li>
          <NavLink to="/flood" className={navClass} title="Flood Monitoring">
            <i className="bi bi-water"></i>
          </NavLink>
        </li>

        {/* ✅ USERS */}
        {hasRole(["super_admin", "it_admin"]) && (
          <li>
            <NavLink to="/users" className={navClass} title="Users">
              <i className="bi bi-people"></i>
            </NavLink>
          </li>
        )}

        {/* ✅ COMPANIES */}
        {hasRole(["super_admin"]) && (
          <li>
            <NavLink to="/companies" className={navClass} title="Companies">
              <i className="bi bi-buildings"></i>
            </NavLink>
          </li>
        )}

      </ul>

      {/* ✅ LOGOUT */}
      <div className="sidebar-bottom">
        <NavLink
  to="#"
  className="sidebar-link"
  onClick={handleLogout}
  title="Logout"
>
  <i className="bi bi-box-arrow-right"></i>
</NavLink>
      </div>

    </div>
  );
}