import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import AddStoreForm from "../components/AddStoreForm";

function Dashboard() {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/stores/mine", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchStores();
    }
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <div>
      <h2>My Stores</h2>
      <AddStoreForm onStoreAdded={fetchStores} />
      {stores.length === 0 ? (
        <p>No stores found</p>
      ) : (
        <ul>
          {stores.map((store) => (
            <li key={store._id}>
              {store.name} - {store.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;