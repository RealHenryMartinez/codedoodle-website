import React, { useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.js";
import "../styles/auth/login.css";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  // Initialize the login values
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Get the current referenced values
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const userInfo = {
      email,
      password,
    };

    if (email && password) {
      handleLogin(userInfo)
        .then(() => {
          // Update the login state
          navigate('/')
        })
        .catch((error) => {
          // Handle login error
          console.log("Login error:", error);
        });
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <label>Email</label>
          <br />
          <input ref={emailRef} type="email" name="email" required />
        </div>
        <div className="input-container">
          <label>Password</label>
          <br />
          <input ref={passwordRef} type="password" name="pass" required />
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
