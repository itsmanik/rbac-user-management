import { useState } from "react";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card card">
        <p className="eyebrow">Welcome back</p>
        <h2>Sign in to your workspace</h2>
        <p className="muted">
          Access dashboard insights, profile settings, and role-based user controls.
        </p>

        <label className="field-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="input"
          placeholder="you@company.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label className="field-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="input"
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {error && <p className="error-text">{error}</p>}

        <button className="primary-btn" onClick={handleLogin} disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
