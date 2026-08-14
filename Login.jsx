import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("LOGIN BUTTON CLICKED");

    // Accept any text
    login(
      email || "admin@gmail.com",
      password || "123456"
    );

    console.log("LOGIN SUCCESS");

    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ₹
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your FinTrack account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="auth-field">

            <label>Email</label>

            <div className="auth-input">

              <Mail size={18} />

              <input
                type="text"
                name="email"
                placeholder="Enter the email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

          </div>


          <div className="auth-field">

            <label>Password</label>

            <div className="auth-input">

              <Lock size={18} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="eye-button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>


          <div className="forgot-row">

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>


          <button
            type="submit"
            className="auth-submit"
          >
            Login
          </button>

        </form>


        <p className="auth-footer">

          Don't have an account?{" "}

          <Link to="/signup">
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;