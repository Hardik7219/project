'use client'
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    let [user,setUser]=useState("SIGN IN");
    return (
        <>
            <div className="w-full h-20 sm:h-10 flex items-center justify-between bg-gray-800 p-3 text-black">
          <div className="bg-black text-amber-50 justify-self-start "><Link href={"/"}>APP</Link></div>
          <div className="justify-self-end">
            <Link className=" hover:text-gray-800 bg-blue-100 p-1 m-1 rounded-[5px] text-red-600 " href="/sign">{user}</Link>
            <Link className=" hover:text-gray-800 bg-blue-100 p-1 m-1 rounded-[5px] text-green-500 "href="/login">login</Link>
          </div>
        </div>
        </>
    );
}