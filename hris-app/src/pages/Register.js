import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../components/Footer";
import "../css/layout.css";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            username,
            password,
            role,
            position,
            salary,
            photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=${username}`,
        };

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const usernameExists = storedUsers.some((u) => u.username === username);

        if (usernameExists) {
            alert("Username sudah digunakan.");
            return;
        }

        localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        const newEmployee = {
            id: Date.now(),
            name: username,
            email: "",
            position,
            salary: Number(salary) || 0,
            photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=${username}`,
        };

        employees.push(newEmployee);
        localStorage.setItem("employees", JSON.stringify(employees));

        alert("Registrasi berhasil. Silakan login.");
        navigate("/login");
    };

    const registerBgStyle = {
        backgroundImage: "url('/img/bg-cyberpunk.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
    };

    return (
        <div style={registerBgStyle} className="d-flex flex-column min-vh-100">
            <div className="flex-grow-1 d-flex justify-content-center align-items-center overflow-hidden p-3">
                <div
                    className="auth-container"
                    style={{
                        maxWidth: "400px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "12px",
                        padding: "30px",
                        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                    }}
                >
                    <h2>Register</h2>
                    <form className="auth-form" onSubmit={handleRegister}>
                        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                            <div style={{ flex: 1 }}>
                                <p className="text-gray-400">Username</p>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div style={{ flex: 1, position: "relative" }}>
                                <p className="text-gray-400">Password</p>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        color: "#888",
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-400">Role</p>
                        <select
                            className="form-control mb-3"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        <div style={{ display: "flex", gap: "1rem" }}>
                            <div style={{ flex: 1 }}>
                                <p className="text-gray-400">Position</p>
                                <input
                                    type="text"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p className="text-gray-400">Salary</p>
                                <input
                                    type="number"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-100 my-3">
                            Register
                        </button>
                        <button
                            type="button"
                            className="btn btn-link w-100"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Lupa Password?
                        </button>
                       
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
