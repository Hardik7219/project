'use client'
import React, {useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/LoadingScreen/Loading";
export default function Signin() {
  const [email,setEmail]=useState<string>("");
  const [pswd,setPswd]=useState<string>("");
  const [err,setErr]=useState<string>("");
  const [psshow,setPasshow]=useState<boolean>(false);
  const router = useRouter();
  const [loader,setLoader]=useState<boolean>(false)
  

  const getValue =async (e: React.FormEvent)=>{
    e.preventDefault();
    if(loader) return;
    setLoader(true)
    try
    {
    if(!email || !pswd )
    {
      setErr("ALL field must recuired ");
      return;
    }
    if(!email.includes("@"))
    {
      setErr("Email is not valid ");
      return;
    }
    if(pswd.length<6)
    {
      setErr("Password must be at least 6 characters");
      return;
    }
    setErr("")
      const res = await signIn("credentials", {
      email,
      password:pswd,
      redirect: false,
    });

    if (res?.error) {
      setErr(res.error);
    } else {
      router.push("/pages/home");
    }
  }
  catch (error: any) {
      setErr(error.message || "Something went wrong");
  }
  finally{
    setLoader(false)
  }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
    <h1 className="m-1.5">LOG IN</h1>
        {loader && (
            <Loading/>
        )}
    {err && (<p className="text-red-600 text-2xl">{err}</p>)}
      <form onSubmit={getValue} className="bg-white  flex flex-col justify-center items-center p-6 rounded-lg shadow-md w-full lg:w-98">
        

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
          <Link className="p-1 h-10 w-20 text-green-400 font-bold hover:text-green-200 " href="/sign">SIGN UP</Link>
        </div>
      </form>
    </div>
  );
}