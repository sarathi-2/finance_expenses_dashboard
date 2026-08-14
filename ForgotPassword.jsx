import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  WalletCards,
} from "lucide-react";

import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    const savedAccount =
      localStorage.getItem("fintrackAccount");

    if (!savedAccount) {
      setError(
        "No account found. Please create an account first."
      );
      return;
    }

    const account = JSON.parse(savedAccount);

    if (account.email !== email) {
      setError(
        "No account is registered with this email."
      );
      return;
    }

    setMessage(
      "Password reset instructions have been sent to your email."
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Brand */}
        <div className="auth-brand">
          <div className="brand-logo">
            <WalletCards size={27} />
          </div>

          <h1>FinTrack</h1>

          <p>
            Take control of your money.
            <br />
            Track, manage and grow your finances.
          </p>

          <div className="auth-feature">
            <span>✓</span>
            Secure account management
          </div>

          <div className="auth-feature">
            <span>✓</span>
            Simple financial tracking
          </div>

          <div className="auth-feature">
            <span>✓</span>
            Manage your expenses easily
          </div>
        </div>

        {/* Forgot Password Card */}
        <div className="auth-card forgot-card">

          <Link
            to="/login"
            className="back-login"
          >
            <ArrowLeft size={17} />
            Back to Login
          </Link>

          <div className="forgot-icon">
            <Mail size={28} />
          </div>

          <div className="auth-header">
            <h2>Forgot Password?</h2>

            <p>
              Enter your registered email address and
              we'll help you reset your password.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {message && (
            <div className="auth-success">
              ✓ {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="auth-field">
              <label>Email Address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setMessage("");
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              Send Reset Instructions
              <ArrowRight size={18} />
            </button>

          </form>

          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup">
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;