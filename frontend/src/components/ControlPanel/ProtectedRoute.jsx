import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  async function checkAuth() {
    const response = await axios.get("/api/session", { withCredentials: true });
    setIsLoggedIn(response.data.isAuth);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoggedIn === false) {
    return <Navigate to="/auth" replace />;
  } else if (isLoggedIn === true) {
    return children;
  }
}
