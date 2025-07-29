import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.title}>Login Store Owner</div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className={styles.button} type="submit">Login</button>
        </form>
        <div className={styles.registerText}>
          Don't have an account?
          <Link className={styles.registerLink} to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;