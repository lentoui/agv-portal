import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Flood from "./pages/Flood";
import Companies from "./pages/Companies";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
  path="/users"
  element={
    <ProtectedRoute
      roles={["super_admin", "it_admin"]}
    >
      <Users />
    </ProtectedRoute>
  }
/>
        <Route path="/flood" element={<Flood />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;