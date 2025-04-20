import React, { useRef } from "react";
import { useState, useEffect } from "react";

const Signup = () => {
const nameRef=useRef(null) 
const emailRef=useRef(null) 
const passwordRef=useRef(null) 
   
//Registering the data
const handleSubmit=async (e)=>{
    e.preventDefault()
     const data={
        name:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value
     }

     try{
     const serverPath=import.meta.env.VITE_SERVER
     const res=await fetch(`${serverPath}/register`,{
        method:"post",
        credentials:'include',
        headers:{
        "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
     })

     console.log(await res.json())

     }catch(err){
        console.log(err)
     }
    }
 
        // rendering the jsx
    return (
    <main>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <input type="text" name="name" placeholder="username" ref={nameRef}/>
        <input type="email" name="email" placeholder="email" ref={emailRef}/>
        <input type="password" name="password" placeholder="password" ref={passwordRef}/>
        <button type="submit">Get started</button>
      </form>
    </main>
  );
};

export default Signup;
