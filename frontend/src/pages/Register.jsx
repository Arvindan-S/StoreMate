
import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    shopName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/users/register", form);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register to StoreMate</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="shopName" className="form-label">Shop Name</label>
            <input
              id="shopName"
              name="shopName"
              type="text"
              value={form.shopName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit">
            Register
          </button>
        </form>
        <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="auth-link">
          Already have an account? Login here
        </a>
      </div>
    </div>
  );
}

export default Register;
