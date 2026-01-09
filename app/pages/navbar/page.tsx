'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import {useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    const [user,setUser]=useState<boolean>(false);
    const [isLogin,setIsLogin]=useState<boolean>(false);
    const {data : session} = useSession();
    
    
    useEffect(() => {
      if (session) {
        setIsLogin(true);
        setUser(true);
      } else {
        setIsLogin(false);
        setUser(false);
      }
    }, [session]);

    return (
        <>
          <div className="w-full border-b-2 h-15 lg:h-10 flex items-center justify-between bg-gray-900 p-3 sticky top-0 z-10 text-black">
            <div className="bg-black text-amber-50 justify-self-start "><Link href={"/pages/home"}>APP</Link></div>
              <p></p>
            <div className="justify-self-end">
            
              <button className=" hover:text-gray-800 bg-zinc-500  border-2 border-black p-0.5 m-1 text-mono rounded-[5px] text-red-600 " onClick={()=>{signOut({callbackUrl:"/login"})}}>{user? "LOG OUT" : "SIGN IN"}</button>
              <Link className="  hover:text-gray-800 bg-zync-100 p-1 m-1 rounded-[5px]  border-black text-mono text-green-500 "href={isLogin? "/pages/profile" : "/login"}>{isLogin? <FontAwesomeIcon icon={faCircleUser} style={{color: "white",fontSize: "25  px"}} /> :"LOG IN"}</Link>
            </div>
        </div>
        </>
    );
}

