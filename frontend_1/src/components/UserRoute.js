import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const UserRoute = () => {
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

        if (res.data.role === "user") {
          setAuthorized(true);
        } else {
          // If it's an admin trying to access user-only area
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) return <p>Checking auth...</p>;
  if (authorized === false) return <Navigate to="/" />;
  return <Outlet />;
};

export default UserRoute;
