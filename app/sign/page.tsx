'use client'
import React, {useState } from "react";
import Link from "next/link";

export default function Signin() {
  const [email,setEmail]=useState<string>("");
  const [user,setUser]=useState<string>("");
  const [pswd,setPswd]=useState<string>("");
  const [err,setErr]=useState<string>("");
  const [psshow,setPasshow]=useState<boolean>(false);

  const getValue =async (e: React.FormEvent)=>{
    e.preventDefault();
    const res = await fetch('/api/sign-in',
    {
        method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName:user, email, password: pswd }),
    })  
    const data = await res.json();
    setErr(data.message);
  }
  

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
    <h1 className="m-1.5">CREATE USER</h1>
    {err && (<p className="text-red-600 text-2xl">{err}</p>)}
      <form onSubmit={getValue} className="bg-white  flex flex-col justify-center items-center p-6 rounded-lg shadow-md w-full lg:w-98">
        
        <input onChange={(e)=>{
          setUser(e.target.value)
        }}
          className="outline-none bg-gray-700 text-gray-300 p-3 mb-4 rounded w-full h-10 lg:h-12"
          type="text"
          placeholder="Username"
        />

        <input onChange={(e)=>{
          setEmail(e.target.value)
        }}
          
          className="outline-none bg-gray-700 text-gray-300 p-3 mb-4 rounded w-full h-10 lg:h-12"
          type="email"
          placeholder="Email"
        />
        <div className=" flex items-center justify-center">

          <input onChange={(e)=>{
            setPswd(e.target.value)
          }}
          
          className="outline-none bg-gray-700 text-gray-300 p-3 mb-4 rounded w-full h-10 lg:h-12"
          type={psshow ? "text" : "password"}
          placeholder="Password"
          />
          <input onClick={()=>{setPasshow(!psshow)}} className="h-10 rounded-sm mb-4 ml-4 p-3 w-20 bg-gray-500 text-black" type="button" value={psshow ? "HIDE" : "SHOW"}/>
        </div>
        <input  className="bg-amber-500 p-1 h-10 w-20 text-black hover:text-gray-800 hover:bg-amber-400 rounded-2xl" type="submit" value={"SIGN IN"}/>
        <div className="flex self-end justify-self-end">
          <Link className="p-1 h-10 w-20 text-green-400 font-bold hover:text-gray-800 " href="/login">LOGIN</Link>
        </div>
      </form>
    </div>
  );
}