import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //logining into the account
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const serverPath = import.meta.env.VITE_SERVER;
      const res = await fetch(`${serverPath}/login`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        navigate("/app");
      }else{
       
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   JSX RENDERING
  return (
    <main>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="email" name="email" placeholder="email" ref={emailRef} />
        <input
          type="password"
          name="password"
          placeholder="password"
          ref={passwordRef}
        />
        <button type="submit">Get started</button>
      </form>
    </main>
  );
};

export default Login;
