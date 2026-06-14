import { Navigate } from "react-router-dom";

import { hasRole } from "../utils/auth";

export default function ProtectedRoute({
  roles,
  children
}) {

  if (!hasRole(roles)) {
    return <Navigate to="/dashboard" />;
  }

  return children;

}