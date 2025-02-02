import React, { useState } from "react";
import "./Register.css";

function Register({ onRegister }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isEmailTaken = existingUsers.some(user => user.email === email);
    if (isEmailTaken) {
      setError("Email is already taken.");
      return;
    }
  
    const newUser = { firstName, lastName, email, password };
    onRegister(newUser); 
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="sign-up-container">
      <h2>Create Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <input
          className="sign-up-inputs"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="sign-up-inputs"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          className="sign-up-inputs"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="sign-up-inputs"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="sign-up-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
