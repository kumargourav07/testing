// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const userId = Math.random().toString(36).substring(2, 8); // dummy ID
    const user = { id: userId, name };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/drives");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin} style={{ marginLeft: "1rem" }}>
        Login
      </button>
    </div>
  );
};

export default Login;
