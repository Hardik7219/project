'use client'
import React, { useState } from 'react';
import Task from '../task/page'
import { useSession } from 'next-auth/react';
export default function ProfileEdit() {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {data:session}= useSession();
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
        console.log(data)

    }

    return (
        <>
            <div className="bg-zinc-900 fixed inset-0 z-50 h-screen w-full">
                <div className="bg-gray-900">
                    <div className=" ">
                        <div className="bg-gray-900 rounded-sm mb-10 p-10 flex ">
                            <div className="bg-amber-50 h-60 w-60">
                                <div className="bg-blue-950 h-40 w-40 overflow-hidden flex items-end justify-end rounded-full">
                                    <input className=' w-full h-full bg-transparent' type="file" accept="image/*"
                                            onChange={(e) => setAvatar(e.target.files?.[0] || null)}/>
                                </div>
                            </div>
                            <div className="bg-amber-300 h-60 w-60">
                                <input type="text" onChange={(e) => setName(e.target.value)} className="bg-amber-50 text-black" placeholder={session?.user.userName}></input>
                                <input type="text" onChange={(e) => setEmail(e.target.value)} className="bg-amber-50 text-black" placeholder={session?.user.email}></input>      
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