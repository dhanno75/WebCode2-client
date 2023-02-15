import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <section>{children}</section>;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;
