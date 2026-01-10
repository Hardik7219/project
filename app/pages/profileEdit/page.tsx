'use client'
import React, { useEffect, useState } from 'react';
import Task from '../task/page'
import { useSession } from 'next-auth/react';
export default function ProfileEdit() {
    const {data:session}= useSession();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {update} = useSession();
    const [user,setUser]=useState('')
    const [userEmail,setUserEmail]=useState('')
    const change= ()=>{
        setUser(session?.user.userName);
        setUserEmail(session?.user.email)
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        
        if (name) formData.append("userName", name);
        if (email) formData.append("email", email);
        if (avatar) formData.append("avatar", avatar);
        
        const res = await fetch("/api/fetch", {
            method: "PUT",
            body: formData
        });
        const data = await res.json()
        await update();
    }
    useEffect(change)

    return (
        <>
            <div className="bg-zinc-900 fixed inset-0 z-50 h-screen w-full">
                <div className="bg-gray-900">
                    <div className=" ">
                        <div className="bg-gray-900 rounded-sm mb-10 p-10 flex ">
                            <div className=" h-60 w-60">
                                <div className="bg-blue-950 h-40 w-40 overflow-hidden flex items-end justify-end rounded-full">
                                    <input className=' w-full h-full bg-transparent' type="file" accept="image/*"
                                            onChange={(e) => setAvatar(e.target.files?.[0] || null)}/>
                                </div>
                            </div>
                            <div className=" h-60 w-60">
                                <input type="text" placeholder={user} onChange={(e) => setName(e.target.value)} className="m-2 outline-none text-white font-bold font-mono" ></input>
                                <input type="text" placeholder={userEmail} onChange={(e) => setEmail(e.target.value)} className="m-2 outline-none font-bold font-mono text-white" ></input>      
                            </div>
                            <button onClick={submit} >update</button>
                        </div>
                        <div className="bg-gray-900 rounded-sm">
                            <Task></Task>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}