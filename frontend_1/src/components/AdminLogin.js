import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/AdminLogin.css"
import { FaEye, FaEyeSlash } from "react-icons/fa"; // eye icons
const AdminLogin = () => {
  //  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // for toggling

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
   
      });

      if (res.data.role === "admin") {
        localStorage.setItem("token", res.data.token);
        navigate("/admin");
      } 
      else if (res.data.role === "user") {
            navigate("/");
            localStorage.setItem("token", res.data.token);
            console.log(res.data.token);
            toast.success("You can now contact us!");
          }
      else if(res.data.role!=="user"||res.data.role!=="admin"){
          navigate("/signUp");
          toast.user("Register to be a user");
      }
      
      else {
        toast.error("Access Denied: Not an admin");
      }
    } catch (err) {
        const msg = err?.response?.data?.message || "Login failed";
        toast.error(msg);
        console.error("Login error:", err);
    }
  };

  return (
    <div className="form_container">
      <form onSubmit={handleLogin} className="_login_form">
        {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select> */}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="user_email"
        />

        <div className="password_field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="user_password"
          />
          <span
            className="toggle_eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye />: <FaEyeSlash /> }
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
