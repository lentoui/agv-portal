import { NavLink } from "react-router-dom";
import { hasRole } from "../utils/auth";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navClass = ({ isActive }) =>
    isActive
      ? "sidebar-link active-link"
      : "sidebar-link";

  return (
    <div
      className="bg-success text-white p-3 vh-100"
      style={{ width: "240px" }}
    >
      <h4 className="mb-4">AGV Portal</h4>

      <ul className="nav flex-column">

        <li className="nav-item">
          <NavLink to="/dashboard" className={navClass}>
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>

        {hasRole(["super_admin"]) && (

  <li className="nav-item">

    <NavLink to="/companies" className={navClass}>
      <i className="bi bi-buildings me-2"></i>
      Companies
    </NavLink>

  </li>

)}

        <li className="nav-item">
          <NavLink to="/flood" className={navClass}>
            <i className="bi bi-water me-2"></i>
            Flood Monitoring
          </NavLink>
        </li>

        {hasRole(["super_admin", "it_admin"]) && (

        <li className="nav-item">

          <NavLink to="/users" className={navClass}>
            <i className="bi bi-people me-2"></i>
            Users
          </NavLink>

        </li>

)}

        {user?.role === "admin" && (
          <li className="nav-item">
            <NavLink to="/users" className={navClass}>
              <i className="bi bi-people me-2"></i>
              User Management
            </NavLink>
          </li>
        )}

      </ul>
    </div>
  );
}