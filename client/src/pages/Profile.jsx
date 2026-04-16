import { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
      setName(res.data.name);
    } catch (err) {
      setMessage("Error fetching profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    setMessage("");

    try {
      await api.put("/users/me", { name, password });
      setMessage("Profile updated successfully.");
      setPassword("");
      fetchProfile();
    } catch (err) {
      setMessage("Error updating profile.");
    }
  };

  if (!user) {
    return <p className="muted">Loading profile...</p>;
  }

  return (
    <section className="card profile-grid">
      <div>
        <p className="eyebrow">Account</p>
        <h2>My Profile</h2>
        <p className="muted">Keep your account information current and secure.</p>

        <div className="info-list">
          <p>
            <span>Email:</span> {user.email}
          </p>
          <p>
            <span>Role:</span> {user.role}
          </p>
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="name">
          Display Name
        </label>
        <input
          id="name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <label className="field-label" htmlFor="newPassword">
          New Password
        </label>
        <input
          id="newPassword"
          className="input"
          type="password"
          placeholder="Leave blank to keep current password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {message && <p className={message.includes("Error") ? "error-text" : "success-text"}>{message}</p>}

        <button className="primary-btn" onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </section>
  );
};

export default Profile;
