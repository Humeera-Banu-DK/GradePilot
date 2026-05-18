import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  GraduationCap,
  User,
  Home,
  Calculator,
  BookOpen,
  LogOut,
  UserCircle,
  Upload,
  UserPlus,
  LogIn
} from "lucide-react";

function Navbar() {
  const { isAuthenticated, logout, email } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* GOOGLE FONT (FIGMA FONT = INTER) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* TOP NAVBAR */}
      <header className="nav">
        <div className="nav-left" onClick={() => navigate("/")}>
          <div className="logo-icon">
            <GraduationCap size={22} />
          </div>
          <span className="logo-text">CGPA Estimator</span>
        </div>

        <div className="nav-right">
          {!isAuthenticated ? (
            <>
              <button className="btn ghost" onClick={() => navigate("/login")}>
                <LogIn size={16} color="#fb923c" style={{ marginRight: "8px" }} />
                Login
              </button>
              <button className="btn primary" onClick={() => navigate("/signup")}>
                <UserPlus size={16} color="#fff" style={{ marginRight: "8px" }} />
                Sign Up
              </button>
            </>
          ) : (
            <button className="profile-btn" onClick={() => setOpen(true)}>
              <User size={20} />
            </button>
          )}
        </div>
      </header>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="avatar">
            <User size={36} />
          </div>
          <h3>My Account</h3>

          {/* ✅ REAL LOGGED-IN USER EMAIL */}
          <p>{email}</p>
        </div>

        <nav className="sidebar-menu">
          <button onClick={() => {navigate("/"); setOpen(false);}}>
            <Home size={18} /> Home
          </button>

          <button onClick={() => {navigate("/profile"); setOpen(false);}}>
            <UserCircle size={18} /> Profile
          </button>

          <button onClick={() => {navigate("/estimate"); setOpen(false);}}>
            <Calculator size={18} /> Estimation
          </button>

          <button onClick={() => {navigate("/notes"); setOpen(false);}}>
            <BookOpen size={18} /> Access Notes
          </button>

          {/* ✅ NEW OPTION */}
          <button onClick={() => {navigate("/upload-notes"); setOpen(false);}}>
            <Upload size={18} /> Upload Notes
          </button>

          <hr />

          <button className="logout" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* STYLES */}
      <style>{`
        * {
          font-family: 'Inter', sans-serif;
        }

        .nav {
          height: 64px;
          padding: 0 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e5e7eb;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg,#fb923c,#fbbf24);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .logo-text {
          font-weight: 800;
          font-size: 20px;
          color: #f97316;
        }

        .nav-right {
          display: flex;
          gap: 12px;
        }

        .profile-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg,#fb923c,#fbbf24);
          border: none;
          color: #fff;
          cursor: pointer;
        }

        .btn {
          padding: 8px 18px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }

        .btn.primary {
          background: linear-gradient(135deg,#fb923c,#fbbf24);
          color: #fff;
          text-align: center;
        }

        .btn.ghost {
          background: transparent;
          border: 2px solid #fb923c;
          color: #fb923c;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 60;
        }

        .sidebar {
          position: fixed;
          top: 0;
          right: -360px;
          width: 320px;
          height: 100%;
          background: #fff;
          z-index: 70;
          transition: right 0.3s ease;
          box-shadow: -20px 0 40px rgba(0,0,0,0.2);
        }

        .sidebar.open {
          right: 0;
        }

        .sidebar-header {
          padding: 32px;
          text-align: center;
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg,#fb923c,#fbbf24);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin: 0 auto 16px;
        }

        .sidebar-menu {
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sidebar-menu button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: transparent;
          font-weight: 600;
          cursor: pointer;
        }

        .sidebar-menu button:hover {
          background: #fff7ed;
          color: #f97316;
        }

        .sidebar-menu hr {
          margin: 16px 0;
          border: none;
          border-top: 1px solid #e5e7eb;
        }

        .logout {
          color: #ef4444;
        }
      `}</style>
    </>
  );
}

export default Navbar;
