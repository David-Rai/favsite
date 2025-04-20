import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const serverPath = import.meta.env.VITE_SERVER;
  const navigate=useNavigate()
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //verification
  useEffect(()=>{
  const verify=async ()=>{
    const res=await fetch(`${serverPath}/verify`,{
      method:"GET",
      credentials:"include"
    })
    const result=await res.json()
    if(result.auth){
      navigate('/app')
    }
  }
verify()
  },[])

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
      console.log(result)
      
      if (result.status === 201) {
     navigate('/login')
      }

    } catch (err) {
      console.log(err);
    }
  };

  // rendering the jsx
  return (
    <main>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="name" placeholder="username" ref={nameRef} />
          <input type="email" name="email" placeholder="email" ref={emailRef} />
          <input
            type="password"
            name="password"
            placeholder="password"
            ref={passwordRef}
          />
          <button type="submit">Get started</button>
          <button onClick={()=> navigate('/login')}>Login</button>
        </form>
    </main>
  );
};

export default Signup;
