import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/dashboard" className="navbar-brand">
          StoreMate
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="/dashboard" className="navbar-link">
            Dashboard
          </a>
          <a href="/stores" className="navbar-link">
            Stores
          </a>
          <a href="/products" className="navbar-link">
            Products
          </a>
          <button onClick={handleLogout} className="navbar-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;