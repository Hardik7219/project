'use client'
import { useState } from "react";

export default function Action({id,onClose}) {
            const [title,setTitle]=useState("")
            const [details,setDetails]= useState("")
            const [msg,setMsg]=useState("")

            const deleteTask = async () =>{
                const res = await fetch('/api/task',{
                    method :"DELETE",
                    headers:{ "Content-Type": "application/json" },
                    body: JSON.stringify({id:id}),   
                })
                    const data = await res.json();
                    setMsg(data.message)
                }
            const getTask = async (e: React.FormEvent) =>{
                e.preventDefault();
                const res = await fetch('/api/task',{
                    method :"PUT",
                    headers:{ "Content-Type": "application/json" },
                    body: JSON.stringify({ id: id ,title: title,detail:details }),   
                })
                    const data = await res.json();
                    if (data.message) {
                        setMsg(data.message);
                        onClose?.();
                    }
                }
    return (
        <>
            <div className="flex justify-center items-center   p-3">
                <div className="flex flex-col m-10 p-5 justify-center items-center bg-gray-900 w-70 rounded-2xl h-50">
                    <p className="font-mon text-2xl font-bold">EDIT THE TASK</p>
                    {(msg && <p className="text-red-400 font-bold font-sans">{msg}</p>)}
                    <div className="m-2">
                        <form className="p-2 flex justify-center items-center flex-col gap-5" onSubmit={getTask}>
                            <input className=" p-1 transparent outline-none border-black border-2 rounded-sm text-white" onChange={(e)=>setTitle(e.target.value)}  type="text" placeholder="New Task Title"></input>
                            <textarea onChange={(e)=>setDetails(e.target.value)} className=" transparent resize-none outline-none border-black border-2 p-1 rounded-sm text-white" placeholder="Detail"></textarea>
                            <input type="submit" className=" rounded-sm text-black font-bold p-1 flex justify-center items-center  bg-cyan-500 shadow-lg shadow-cyan-500/50 h-10 w-30 " value="UPDATE TASK"/>
                        </form>
                    </div>
                    <h1>OR</h1>
                    <button className="p-1 rounded-sm flex justify-center items-center  bg-red-500 shadow-lg shadow-red-500/50 h-10 w-30 " onClick={deleteTask}>DELETE</button>
                </div>
            </div>
        </>
    );
}