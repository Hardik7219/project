'use client'
import { useState } from "react";
import Loading from "@/components/LoadingScreen/Loading";
export default function EditAchievement({id,onClose}:any) {
    const [title,setTitle]=useState("")
    const [details,setDetails]= useState("")
    const [msg,setMsg]=useState("")
    const [date1,setDate1]= useState<string>('')
    const [loading ,setLoading] = useState<boolean>(false)
            const getAchievement = async (e: React.FormEvent) =>{
                e.preventDefault();
                setLoading(true)
                if(loading) return ; 
                try
                {
                const res = await fetch('/api/achiv',{
                    method :"PUT",
                    headers:{ "Content-Type": "application/json" },
                    body: JSON.stringify({ id: id ,title: title,detail:details, createDate : date1 }),   
                })
                    const data = await res.json();
                    if (data.message) {
                        setMsg(data.message);
                        onClose?.();
                    }
                }catch(error :any)
                {
                    setMsg(error.message || "Something went wrong");
                }
                finally{
                    setLoading(false)
                }
                }
    return (
        <>
            <div className="flex justify-center items-center p-10">
                {loading && (
                    <Loading></Loading>
                )}
                <div className="flex flex-col m-10 p-5 justify-center items-center bg-gray-900 w-70 rounded-2xl h-50">
                    <p className="font-mon text-lg  font-bold">EDIT THE ACHIEVEMENT</p>
                    {(msg && <p className="text-red-400 font-bold font-sans">{msg}</p>)}
                    <div className="m-2">
                        <form className="p-2 flex justify-center items-center flex-col gap-5" onSubmit={getAchievement}>
                            <input className=" p-1 w-80 transparent outline-none border-black border-2 rounded-sm text-white" onChange={(e)=>setTitle(e.target.value)}  type="text" placeholder="New Achievement Title"></input>
                            <textarea onChange={(e)=>setDetails(e.target.value)} className=" transparent resize-none outline-none w-80 border-black border-2 p-1 rounded-sm text-white" placeholder="Detail"></textarea>
                            <input type="date" className="bg-amber-50 text-black font-bold font-mono" onChange={(e)=>{setDate1(e.target.value)}}></input>
                            <input type="submit" className="rounded-sm text-black font-bold p-1 flex justify-center items-center  bg-cyan-500 shadow-lg shadow-cyan-500/50 h-10 w-45 " value="Update Achievement"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}