'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ADD() {
        const [user,setUser]= useState("")
        const [title,setTitle]=useState("")
        const [details,setDetails]= useState("")
        useEffect(() => {
                fetch("/api/fetch")
                .then(res => res.json())
                .then(data => setUser(data));
            }, []);
    
        const getTask = async ()=>{
            const res = await fetch('/api/task',{
                method :"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify({ user: user._id ,title: title,detail:details }),   
            })
                const data = await res.json();
                console.log(data.message);
            }
    return (
        <>
            <div className="flex justify-center items-center bg-amber-50">
                <form onSubmit={getTask}>
                    <input onChange={(e)=>setTitle(e.target.value)} className="bg-amber-600" type="text" placeholder="title"></input>
                    <textarea onChange={(e)=>setDetails(e.target.value)} className="bg-amber-600" placeholder="detail"></textarea>
                    <input type="submit" value="add"/>
                </form>
            </div>
        </>
    );
}