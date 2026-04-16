import { useEffect, useState } from "react";
import api from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // 1. Move the check INSIDE the effect strictly
    if (currentUser?.role === "admin") {
      const fetchUsers = async () => {
        try {
          const res = await api.get("/users");
          setUsers(res.data);
        } catch (err) {
          console.error("Fetch failed", err);
        }
      };
      fetchUsers();
    }
  }, []); // Empty array is fine here

  // 2. The Guard (Return early if not admin)
  if (!currentUser || currentUser.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  return (
    <div>
      <h2>All Users</h2>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id}>
            <p>{user.name} ({user.role})</p>
            <hr />
          </div>
        ))
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default Users;