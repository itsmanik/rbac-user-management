import { NavLink, useNavigate } from "react-router";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">RBAC Console</p>
          <h1>User Management</h1>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/profile">Profile</NavLink>
          {user?.role === "admin" && <NavLink to="/users">Users</NavLink>}
        </nav>

        <div className="user-card">
          <p className="user-name">{user?.name || "User"}</p>
          <p className="user-meta">{user?.email || "No email"}</p>
          <span className="role-pill">{user?.role || "member"}</span>
          <button className="ghost-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default AppLayout;
