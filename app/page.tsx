'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loader from "@/components/loader/Loader";
import { redirect } from "next/navigation";

export default function Page() {

  const {data:session,status}= useSession();
  if(status == 'loading')
    return <Loader></Loader>
  else if(session?.user.id)
    redirect('/pages/home')
  return (
    <div className="">
        <div className="flex">
          <div className="p-5 m-10 text-2xl  w-40 flex justify-center items-center  rounded-sm hover:text-black bg-green-600">
            <Link href="/login">LOGIN</Link>
          </div>
          <div className="p-5 m-10 text-2xl  w-40 flex justify-center items-center rounded-sm hover:text-black bg-yellow-600">
            <Link href="/sign">SIGN IN</Link>
          </div>
        </div>
    </div>
  );
}