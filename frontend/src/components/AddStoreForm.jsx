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
      const token = localStorage.getItem("token");
      await api.post(
        "/stores",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ name: "", location: "", contactEmail: "", contactPhone: "" });
      if (onStoreAdded) onStoreAdded();
      alert("Store added!");
    } catch (error) {
      alert("Failed to add store");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input name="name" placeholder="Store Name" value={form.name} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="contactEmail" placeholder="Contact Email" value={form.contactEmail} onChange={handleChange} required />
      <input name="contactPhone" placeholder="Contact Phone" value={form.contactPhone} onChange={handleChange} required />
      <button type="submit">Add Store</button>
    </form>
  );
}

export default AddStoreForm;
