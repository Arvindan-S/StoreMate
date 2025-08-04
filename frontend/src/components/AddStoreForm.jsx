import { useState } from "react";
import api from "../api/api";

function AddStoreForm({ onStoreAdded }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    contactEmail: "",
    contactPhone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/stores", form);
      setForm({ name: "", location: "", contactEmail: "", contactPhone: "" });
      if (onStoreAdded) onStoreAdded();
      alert("Store added successfully!");
    } catch (error) {
      console.error('Add store error:', error);
      alert(error.response?.data?.message || "Failed to add store");
    }
  };

  return (
    <div className="card" style={{ marginBottom: "2rem" }}>
      <h3 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600" }}>Add New Store</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2" style={{ gap: "1rem" }}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Store Name</label>
          <input
            id="name"
            name="name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            id="location"
            name="location"
            className="form-input"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactEmail" className="form-label">Contact Email</label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            className="form-input"
            value={form.contactEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactPhone" className="form-label">Contact Phone</label>
          <input
            id="contactPhone"
            name="contactPhone"
            className="form-input"
            value={form.contactPhone}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Add Store
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStoreForm;
