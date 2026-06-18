import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Users() {

  const API_URL = "https://abc123.ngrok-free.app"; // ✅ replace with your actual ngrok

  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  /* LOAD DATA */

  useEffect(() => {

    const currentUser = JSON.parse(localStorage.getItem("user"));

    // ✅ LOAD USERS
    fetch(`${API_URL}/users?role=${currentUser.role}&company_id=${currentUser.company_id}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));

    // ✅ LOAD COMPANIES
    fetch(`${API_URL}/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data));

  }, []);

  /* ADD USER */

  const addUser = async () => {

    await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        company_id: companyId,
        name,
        email,
        password,
        role
      })
    });

    window.location.reload();
  };

  /* DELETE USER */

  const deleteUser = async (id) => {

    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE"
    });

    setUsers(users.filter((u) => u.id !== id));
  };

  return (

    <Layout>

      <h2 className="mb-4">Users</h2>

      {/* FORM */}

      <div className="card p-3 mb-4">
        <div className="row g-2">

          {/* COMPANY */}

          <div className="col-md-2">
            <select
              className="form-select"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            >
              <option value="">Select Company</option>

              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}

            </select>
          </div>

          {/* NAME */}

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}

          <div className="col-md-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* ROLE */}

          <div className="col-md-2">
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="super_admin">Super Admin</option>
              <option value="it_admin">IT Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="client_admin">Client Admin</option>
              <option value="client_staff">Client Staff</option>
            </select>
          </div>

          {/* BUTTON */}

          <div className="col-md-2">
            <button
              className="btn btn-success w-100"
              onClick={addUser}
            >
              Add User
            </button>
          </div>

        </div>
      </div>

      {/* TABLE */}

      <div className="card p-3">

        <table className="table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company_name}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}