import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const serverPath = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //verification
  useEffect(() => {
    const verify = async () => {
      const res = await fetch(`${serverPath}/verify`, {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (result.auth) {
        navigate("/app");
      }
    };
    verify();
  }, []);

  //Registering the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await fetch(`${serverPath}/register`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // rendering the jsx
  return (
    <main className="h-screen w-full flex bg-bgprimary items-center justify-center">
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <input
          type="text"
          className="input"
          name="name"
          placeholder="username"
          ref={nameRef}
        />
        <input
          type="email"
          name="email"
          className="input"
          placeholder="email"
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          className="input"
          placeholder="password"
          ref={passwordRef}
        />
        <button type="submit" className="button">
          Get started
        </button>
        <p>or</p>
        <button onClick={() => navigate("/login")} className="button">
          Login
        </button>
      </form>
    </main>
  );
};

export default Signup;
