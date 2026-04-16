import { useEffect, useState } from "react";
import api from "../services/api";

const initialCreateForm = {
  name: "",
  email: "",
  password: "",
  role: "user",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [createForm, setCreateForm] = useState(initialCreateForm);
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const fetchUsers = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "admin") {
      fetchUsers();
    } else {
      setIsLoading(false);
    }
  }, [currentUser?.role]);

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/users", createForm);
      setCreateForm(initialCreateForm);
      setSuccess("User created successfully.");
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (user) => {
    setEditingUser({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status || "active",
    });
    setError("");
    setSuccess("");
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    if (!editingUser) return;

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await api.put(`/users/${editingUser._id}`, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        status: editingUser.status,
      });
      setEditingUser(null);
      setSuccess("User updated successfully.");
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeactivateUser = async (id) => {
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await api.delete(`/users/${id}`);
      setSuccess("User status changed to inactive.");
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to deactivate user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="card">
        <h2>Access denied</h2>
        <p className="muted">Only admins can view the full user directory.</p>
      </div>
    );
  }

  return (
    <section className="admin-layout">
      <div className="card">
        <div className="section-header">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>User Directory</h2>
          </div>
          <span className="role-pill">{users.length} records</span>
        </div>

        {isLoading && <p className="muted">Loading users...</p>}
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        {!isLoading && !error && (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="role-pill">{user.role}</span>
                    </td>
                    <td>
                      <span className={`status-pill ${user.status === "inactive" ? "inactive" : "active"}`}>
                        {user.status || "active"}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button className="secondary-btn" onClick={() => startEdit(user)} disabled={isSubmitting}>
                          Edit
                        </button>
                        <button
                          className="danger-btn"
                          onClick={() => handleDeactivateUser(user._id)}
                          disabled={isSubmitting || user.status === "inactive"}
                        >
                          Deactivate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <p className="eyebrow">Create User</p>
        <h3>Add new team member</h3>
        <form className="form-grid" onSubmit={handleCreateUser}>
          <label className="field-label" htmlFor="createName">
            Name
          </label>
          <input
            id="createName"
            className="input"
            value={createForm.name}
            onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />

          <label className="field-label" htmlFor="createEmail">
            Email
          </label>
          <input
            id="createEmail"
            className="input"
            type="email"
            value={createForm.email}
            onChange={(e) => setCreateForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />

          <label className="field-label" htmlFor="createPassword">
            Password
          </label>
          <input
            id="createPassword"
            className="input"
            type="password"
            value={createForm.password}
            onChange={(e) => setCreateForm((prev) => ({ ...prev, password: e.target.value }))}
            required
            minLength={6}
          />

          <label className="field-label" htmlFor="createRole">
            Role
          </label>
          <select
            id="createRole"
            className="input"
            value={createForm.role}
            onChange={(e) => setCreateForm((prev) => ({ ...prev, role: e.target.value }))}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button className="primary-btn" type="submit" disabled={isSubmitting}>
            Create User
          </button>
        </form>
      </div>

      {editingUser && (
        <div className="card">
          <p className="eyebrow">Update User</p>
          <h3>Edit user details</h3>
          <form className="form-grid" onSubmit={handleUpdateUser}>
            <label className="field-label" htmlFor="editName">
              Name
            </label>
            <input
              id="editName"
              className="input"
              value={editingUser.name}
              onChange={(e) => setEditingUser((prev) => ({ ...prev, name: e.target.value }))}
              required
            />

            <label className="field-label" htmlFor="editEmail">
              Email
            </label>
            <input
              id="editEmail"
              className="input"
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser((prev) => ({ ...prev, email: e.target.value }))}
              required
            />

            <label className="field-label" htmlFor="editRole">
              Role
            </label>
            <select
              id="editRole"
              className="input"
              value={editingUser.role}
              onChange={(e) => setEditingUser((prev) => ({ ...prev, role: e.target.value }))}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <label className="field-label" htmlFor="editStatus">
              Status
            </label>
            <select
              id="editStatus"
              className="input"
              value={editingUser.status}
              onChange={(e) => setEditingUser((prev) => ({ ...prev, status: e.target.value }))}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="row-actions">
              <button className="primary-btn" type="submit" disabled={isSubmitting}>
                Save Changes
              </button>
              <button className="secondary-btn" type="button" onClick={() => setEditingUser(null)} disabled={isSubmitting}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Users;
