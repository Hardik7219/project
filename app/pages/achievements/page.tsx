'use client'

import Loader from '@/components/loader/Loader';
import { useEffect,useState } from 'react';
import ACHIV from '@/components/achievement/ACHIV';


export default function Task({date}) {
    const [userData, setUserData] = useState<any>(null);
    const [date1,setDate1] = useState(date)
    useEffect(() => {

        if(date)
        {
            setDate1(date1) 
        }
        fetch(`/api/fetch?date=${date1}`)
        .then(async res => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            }
            return res.json();
        })
        .then(setUserData)
        .catch(err => console.error("Fetch error:", err));

    }, [date]);
    if(!userData) return <div className='flex justify-center items-center w-full h-screen'><Loader></Loader></div>
    return (
        <>
            <main className="bg-zinc-950 flex flex-col justify-self-center lg:justify-self-end p-2 rounded-md w-full  min-h-screen">
                <h1 className='text-center'>{date1}</h1>
                    <div className="w-full p-1 lg:w-full bg-gray-900 flex flex-col items-center rounded-sm">
                        {!userData?.achivs || userData.achivs.length === 0 ? (    
                            <p className='text-2xl font-bold font-sans text-red-500'>NO Achievement Yet</p>
                        ) : (
                            userData.achivs.map((t: any) => (
                                <ACHIV key={t._id} title1={t.title} detail={t.detail} id={t._id} isStar={t.isStar} date={t.createDate}/>
                            ))
                        )}
                    </div>
                </main>
        </>
    );
}