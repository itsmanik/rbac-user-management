import { useState } from "react";
import api from "../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.location.href = "/";
        } catch (err) {
            console.log("Login failed!", err);
        }
    };
    return (
        <>
            <div>
                <h2>Login</h2>

                <input
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    );
};

export default Login;
