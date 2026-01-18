'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ADD() {
        const [title,setTitle]=useState("")
        const [details,setDetails]= useState("")
        const [msg,setMsg]=useState<string>("")
        const {data : session} = useSession();
        const [date1,setDate1]= useState<string>('')
        const getTask = async (e: React.FormEvent) =>{
            e.preventDefault();
            const res = await fetch('/api/achiv',{
                method :"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify({ user : session?.user.id ,title: title,detail:details , createDate : date1 }),   
            })
                const data = await res.json();
                setMsg(data.message)
            }
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="flex flex-col m-10 justify-center items-center  bg-gray-900 p-2 w-70 rounded-2xl h-50">
                    <p className="font-mon text-2xl font-bold flex justify-center items-center">Add Achievement</p>
                        {(msg && <p className="text-red-400 font-bold font-sans">{msg}</p>)}
                    <div className="m-2">
                        <form className="p-2 flex justify-center items-center flex-col gap-5" onSubmit={getTask}>
                            <input className=" p-1 transparent outline-none border-black border-2 rounded-sm text-white"  onChange={(e)=>setTitle(e.target.value)}  type="text" placeholder="Title"></input>
                            <textarea onChange={(e)=>setDetails(e.target.value)} className=" transparent resize-none outline-none border-black border-2 p-1 rounded-sm text-white" placeholder="Detail"></textarea>
                            <input type="date" onChange={(e)=>{setDate1(e.target.value)}}></input>
                            <input type="submit" className=" rounded-sm p-1 text-black font-bold flex justify-center items-center  bg-cyan-500 shadow-lg shadow-cyan-500/50 h-10 w-30 " value="Add Achievement"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}