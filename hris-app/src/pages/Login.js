import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true, user: email }));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Login gagal: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true, user: user.displayName }));
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error.message);
      alert("Google login gagal: " + error.message);
    }
  };

  const loginBgStyle = {
    backgroundImage: "url('/img/bg-cyberpunk.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <div style={loginBgStyle}>
      <div className="auth-container" style={{ maxWidth: "400px", margin: "100px auto" }}>
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <p className="text-gray-400">Email</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3"
            required
          />
          <p className="text-gray-400">Password</p>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

          <button type="submit" className="btn btn-primary w-100 my-3">
            Login
          </button>
        </form>

        <p className="text-center">atau</p>

        <button className="btn btn-danger w-100 mb-2" onClick={handleGoogleLogin}>
          Login via Google
        </button>

        <button className="btn btn-secondary w-100" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
