import { useState } from "react";

export default function Login() {

  // ✅ your ngrok URL
  const API_URL = "https://new456.ngrok-free.app";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await fetch(`${API_URL}/login`, {
        method: "POST", // ✅ IMPORTANT (must be POST)
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      // ✅ check valid login
      if (res.ok && data.id) {
        localStorage.setItem("user", JSON.stringify(data));

        // ✅ redirect
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Invalid login");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Try again.");
    }

  };

  return (

    <div className="container vh-100 d-flex justify-content-center align-items-center">

      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>

        <h3 className="text-center mb-4">
          AGV Portal Login
        </h3>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          className="btn btn-success w-100"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>

  );

}