'use client'
import React, { useEffect, useState } from 'react';
import Task from '../achievements/page'
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default function ProfileEdit() {
    const {data:session,status}= useSession();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {update} = useSession();
    const [user,setUser]=useState('')
    const [userEmail,setUserEmail]=useState('')
    const [prf,setPrf]=useState<string>(session?.user.avatar)
    

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
        await update(data);
    }
    useEffect( ()=>{
        setUser(session?.user.userName);
        setUserEmail(session?.user.email)
        setPrf(session?.user.avatar)
    },[status,session])

    return (
        <>
            <div className="bg-zinc-900 fixed inset-0 z-50 h-screen w-full">
                <div className="bg-gray-900">
                    <div className=" ">
                        <div className="bg-gray-900 rounded-sm mb-10 lg:p-10 flex  ">
                            <div className=" h-60 w-60 flex justify-center items-center ">
                                <div className=' h-50 w-50 flex items-center rounded-full justify-center  '>
                                    <div className={` border-amber-500 border-2 bg-center bg-cover  h-40 w-40 overflow-hidden  rounded-full`} style={{backgroundImage: `url(${prf})`,}}>
                                    <div className=' m-30 bg-amber-50 flex justify-end items-end'>
                                        <input className='cursor-pointer absolute h-20 w-20 opacity-0' type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)}/> 
                                        <FontAwesomeIcon icon={faImage} style={{fontSize: "30px"}}/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-60 flex justify-center items-center w-60">
                                <div className=''>
                                    <label className='text-emerald-500 font-bold font-sans text-2xl'>UserName:</label><input type="text" placeholder={user} onChange={(e) => setName(e.target.value)} className="m-2 outline-none text-white font-bold font-mono" ></input>
                                    <label className='text-emerald-500 font-bold font-sans text-2xl'>Email:</label><input type="text" placeholder={userEmail} onChange={(e) => setEmail(e.target.value)} className="m-2 outline-none font-bold font-mono text-white" ></input>      
                                </div>
                            </div>
                        </div>
                            <button onClick={submit} className='flex m-10 justify-self-end lg:self-center justify-center items-center rounded-sm text-black font-mono font-bold hover:text-gray-600 shadow-red-600 shadow-md hover:cursor-pointer bg-blue-500 h-10 w-20' >update</button>
                        <div className="bg-gray-900 rounded-sm ">
                            <Task></Task>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}