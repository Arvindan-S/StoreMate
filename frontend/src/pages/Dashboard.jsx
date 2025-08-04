import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import AddStoreForm from "../components/AddStoreForm";
import Navbar from "../components/Navbar";

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
    <>
      <Navbar />
      <div className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">My Stores</h1>
            <p className="dashboard-subtitle">Manage your stores and inventory</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-title">Total Stores</div>
              <div className="stat-value">{stores.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Active Stores</div>
              <div className="stat-value">{stores.filter(store => store.status === 'active').length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Total Products</div>
              <div className="stat-value">0</div>
            </div>
          </div>

          <AddStoreForm onStoreAdded={fetchStores} />

          {stores.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏪</div>
              <h3 className="empty-state-title">No stores yet</h3>
              <p className="empty-state-description">Add your first store to get started</p>
            </div>
          ) : (
            <div className="store-list">
              {stores.map((store) => (
                <div key={store._id} className="store-card">
                  <div className="store-content">
                    <h3 className="store-name">{store.name}</h3>
                    <p className="store-description">{store.location}</p>
                    <div className="store-footer">
                      <span>{store.status}</span>
                      <button 
                        onClick={() => navigate(`/store/${store._id}`)}
                        className="btn btn-primary"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;