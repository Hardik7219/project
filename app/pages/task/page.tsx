'use client'

import Loader from '@/components/loader/Loader';
import { useSession } from 'next-auth/react';
import { useEffect,useState } from 'react';
export default function Task() {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        fetch("/api/fetch")
        .then(res => res.json())
        .then(setUserData);
    }, []);
    if(!userData) return <div className='flex justify-center items-center w-full h-screen'><Loader></Loader></div>
    return (
        <>
            <main className="bg-zinc-950 flex justify-self-center lg:justify-self-end p-2 rounded-md w-full  min-h-screen">
                    <div className="w-full p-1 lg:w-full bg-gray-900 flex flex-col items-center rounded-sm">
                        {!userData?.tasks || userData.tasks.length === 0 ? (    
                            <p>NO task</p>
                        ) : (
                            userData.tasks.map((t: any) => (
                                <div className="bg-gray-800 rounded-md mt-2 p-2 min-h-56 h-auto w-[95%]" key={t._id}>
                                    <div className="w-full">
                                        <h1 className="font-bold text-cyan-600 text-lg">{t.title}</h1>
                                        <div className="ml-5 flex justify-end p-1">
                                            <input type="checkbox" className="h-8 w-8"></input>
                                        </div>
                                    </div>
                                    <div className=" p-1 rounded-sm bg-gray-500 mt-2 w-full min-h-30 h-auto text-wrap tracking-tighter overflow-hidden">
                                        <p className="font-mono text-amber-100">{t.detail}</p>
                                    </div>
                                    <div className="mt-2 flex justify-end p-1">
                                        <button className="bg-green-300 mr-2 px-10 rounded-sm text-black font-bold text-2xl">EDIT</button>
                                        Complate:<input type="checkbox" className="h-8 w-8"></input>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
        </>
    );
}