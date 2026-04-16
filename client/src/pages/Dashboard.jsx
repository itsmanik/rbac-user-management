import { Link } from "react-router";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <section>
      <div className="card">
        <p className="eyebrow">Dashboard</p>
        <h2>Welcome back, {user?.name || "there"}</h2>
        <p className="muted">
          Manage your account, monitor role permissions, and quickly navigate key RBAC routes.
        </p>
      </div>

      <div className="stats-grid">
        <article className="card">
          <p className="stat-label">Current Role</p>
          <p className="stat-value">{user?.role || "Unknown"}</p>
        </article>
        <article className="card">
          <p className="stat-label">Profile Route</p>
          <p className="stat-value">/users/me</p>
        </article>
        <article className="card">
          <p className="stat-label">Admin Users Route</p>
          <p className="stat-value">/users</p>
        </article>
      </div>

      <div className="card">
        <h3>Quick actions</h3>
        <div className="quick-links">
          <Link className="primary-btn as-link" to="/profile">
            Edit Profile
          </Link>
          {user?.role === "admin" && (
            <Link className="secondary-btn as-link" to="/users">
              Open User Directory
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
