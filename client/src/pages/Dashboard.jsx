const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome {user?.name}</p>
            <p>Role: {user?.role}</p>
            {user?.role === "admin" && <p>You are an admin</p>}
        </div>
    );
};

export default Dashboard;
