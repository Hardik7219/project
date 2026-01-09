import { useState, useEffect } from "react";

export default function Action({id,mod}) {
    const [title,setTitle]=useState("")
    const [details,setDetails]= useState("")
    const [msg,setMsg]=useState("")
    


    return (
        <>
            <div>
                <div className="flex flex-col m-10 justify-center items-center bg-gray-900 w-70 rounded-2xl h-50">
                <div className="">
                    <form className="p-2 flex justify-center items-center flex-col gap-5" onSubmit={getTask}>
                        <input className=" p-1 transparent outline-none border-black border-2 rounded-sm text-white" onChange={(e)=>setTitle(e.target.value)}  type="text" placeholder="title"></input>
                        <textarea onChange={(e)=>setDetails(e.target.value)} className=" transparent resize-none outline-none border-black border-2 rounded-sm text-white" placeholder="detail"></textarea>
                        <input type="submit" className="rounded-sm p-1 flex justify-center items-center  bg-cyan-500 shadow-lg shadow-cyan-500/50 h-6 w-20 " value="Add Task"/>
                    </form>
                </div>
                </div>
            </div>
        </>
    );
}