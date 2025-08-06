import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AdminRoute = () => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthorized(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/auth/current", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.role === "admin") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) return <p>Checking auth...</p>;
  if (authorized === false) return <Navigate to="/login" />;
  return <Outlet />;
};

export default AdminRoute;
