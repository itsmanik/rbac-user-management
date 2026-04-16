import { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // fetch profile
  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
      setName(res.data.name);
    } catch (err) {
      alert("Error fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // update profile
  const handleUpdate = async () => {
    try {
      await api.put("/users/me", { name, password });

      alert("Profile updated");
      fetchProfile();
    } catch (err) {
      alert("Error updating profile");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Profile</h2>

      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Profile;