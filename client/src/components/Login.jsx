import React from "react";
import { useRef, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const serverPath = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [res, setRes] = useState(null);
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

  //logining into the account
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await fetch(`${serverPath}/login`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setRes(result)
      if (result.success) {
        navigate("/app");
      } 
    } catch (err) {
      console.log(err);
    }
  };

  //   JSX RENDERING
  return (
    <main className="h-screen w-full flex bg-bgprimary items-center justify-center">
      <form
        className="form justify-evenly h-[40vh]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="labelwrap">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            ref={emailRef}
            className={`input w-full ${res?.status == 500 && "placeholder:text-red-500" }`}
         />
        </div>
        <div className="labelwrap">
          <label htmlFor="password">Password</label>
          <input
            className={`input w-full ${res?.status == 500 && "placeholder:text-red-500" }`}
            type="password"
            name="password"
            placeholder="password"
            ref={passwordRef}
          />
        </div>
<p className="text-red-500 text-sm">{res?.message}</p>
        <button type="submit" className="button">
          login
        </button>
      </form>
    </main>
  );
};

export default Login;
