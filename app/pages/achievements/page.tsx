'use client'

import Loader from '@/components/loader/Loader';
import { useEffect,useState } from 'react';
import ACHIV from '@/components/achievement/ACHIV';


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
                        {!userData?.achivs || userData.achivs.length === 0 ? (    
                            <p className='text-2xl font-bold font-sans text-red-500'>NO Achievement Yet</p>
                        ) : (
                            userData.achivs.map((t: any) => (
                                <ACHIV key={t._id} title1={t.title} detail={t.detail} id={t._id} isStar={t.isStar}/>
                            ))
                        )}
                    </div>
                </main>
        </>
    );
}