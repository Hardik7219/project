'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import {useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
export default function Navbar() {
    const [user,setUser]=useState<boolean>(false);
    const [isLogin,setIsLogin]=useState<boolean>(false);
    const {data : session} = useSession();
    useEffect(()=>{
      if(session) 
      {
          setIsLogin(true);
          setUser(true);
      }
    },[session])
    return (
        <>
          <div className="w-full h-15 lg:h-10 flex items-center justify-between bg-gray-800 p-3 sticky top-0 z-10 text-black">
            <div className="bg-black text-amber-50 justify-self-start "><Link href={"/pages/home"}>APP</Link></div>
            <div className="justify-self-end">
              <Link className=" hover:text-gray-800 bg-blue-100 p-1 m-1 rounded-[5px] text-red-600 " href={user? "/logout" : "/sign"}>{user? "LOG OUT" : "SIGN IN"}</Link>
              <Link className=" hover:text-gray-800 bg-blue-100 p-1 m-1 rounded-[5px] text-green-500 "href={isLogin? "/pages/profile" : "/login"}>{isLogin? "PROFILE" :"LOG IN"}</Link>
            </div>
        </div>
        </>
    );
}

