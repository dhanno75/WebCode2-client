import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  const navigate = useNavigate();
  let isLoggedIn = localStorage.getItem("isLoggedIn") || "false";

  if (isLoggedIn === "true") {
    return props.children;
  } else {
    navigate("/login");
  }
}

export default ProtectedRoute;
