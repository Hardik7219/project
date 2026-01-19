'use client'
import React, { useEffect, useState } from 'react';
import Task from '../achievements/page'
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import Loading from '@/components/LoadingScreen/Loading';

export default function ProfileEdit() {
    const { data: session, status, update } = useSession();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [name, setName] = useState<string>('');
    const [user,setUser]=useState('')
    const [userEmail,setUserEmail]=useState('')
    const [prf, setPrf] = useState<string>("");
    const [loading,setLoading]= useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(loading)return
        setLoading(true)
        try
        {
        const formData = new FormData();
        
        if (name) formData.append("userName", name);
        if (avatar) formData.append("avatar", avatar);
        
        const res = await fetch("/api/fetch", {
            method: "PUT",
            body: formData
        });
        
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message || "Update failed");
        }

        setMsg(data.message)
await update({
  user: {
    userName: data.user.userName,
    avatar: data.user.avatar,
  },
});

    }
    catch (err: any) {
    setMsg(err.message || "Something went wrong");
        }
    finally{
        setLoading(false)
    }
}
    useEffect( ()=>{
        setUser(session?.user.userName?? "");
        setUserEmail(session?.user.email?? "")
        setPrf(session?.user.avatar?? "")
    },[status,session])

    return (
        <>
            <div className="bg-zinc-900 fixed inset-0 z-50 h-screen w-full">
                {loading &&(
                    <Loading></Loading>
                )}
                <div className='bg-gray-950 w-full h-screen'>
                    <div className=' w-full p-1 flex flex-col bg-gray-900'>
                        <div className="rounded-sm p-2 lg:p-10 flex items-center">
                            <div className=" h-50 w-50 flex justify-center items-center ">
                                <div className=' h-50 w-50 flex items-center rounded-full justify-center  '>
                                    <div className={` border-amber-500 border-2 bg-center bg-cover  h-40 w-40 overflow-hidden  rounded-full`} style={{backgroundImage: `url(${prf})`,}}>
                                        <div className=' m-30 bg-amber-50 flex justify-end items-end'>
                                            <input className='cursor-pointer absolute h-20 w-20 opacity-0' type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)}/> 
                                                <FontAwesomeIcon icon={faImage} style={{fontSize: "30px"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-40 flex justify-center items-center w-60">
                                <div className=''>
                                    <label className='text-emerald-500 font-bold font-sans text-lg'>UserName:</label><input type="text" placeholder={user} onChange={(e) => setName(e.target.value)} className="m-2 outline-none text-white font-bold font-mono" ></input>
                                    <label className='text-emerald-500 font-bold font-sans text-lg'>Email:</label><input type="text" placeholder={userEmail} className="m-2 outline-none font-bold font-mono text-white" readOnly   ></input>      
                                </div>
                            </div>
                        </div>
                        <div className='w-full p-2 '>
                            <h1 className='flex justify-self-center text-sm text-red-700 font-mono font-bold ' >{msg}</h1>
                            <button onClick={submit} className=' flex self-end justify-center items-center justify-self-end rounded-sm text-black font-mono font-bold hover:text-gray-600 shadow-red-600 shadow-md hover:cursor-pointer bg-blue-500 h-10 w-20' >update</button>
                        </div>
                    </div>
                    <div className='w-full mt-5 bg-gray-900'>
                        <div className="rounded-sm ">
                            <Task></Task>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    );
}