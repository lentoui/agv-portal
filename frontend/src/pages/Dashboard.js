import Layout from "../components/Layout";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "/";
    return null;
  }

  return (
    <Layout>
      <h2 className="mb-4">Dashboard</h2>

      <div className="card shadow-sm p-3 mb-3">
        <h5>User Role</h5>
        <p>{user.role}</p>
      </div>

      <button
        className="btn btn-danger"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </Layout>
  );
}
