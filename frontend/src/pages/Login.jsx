import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Update import path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/users/login", { email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login to StoreMate</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit">
            Login
          </button>
        </form>
        <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }} className="auth-link">
          Don't have an account? Register here
        </a>
      </div>
    </div>
  );
}

export default Login;