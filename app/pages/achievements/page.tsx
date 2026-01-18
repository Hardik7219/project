'use client'

import Loader from '@/components/loader/Loader';
import { useEffect,useState } from 'react';
import ACHIV from '@/components/achievement/ACHIV';

type AchivProps = {
    date?: string | null;
    star?: boolean ; 
};
export default function Achiv({date,star} : AchivProps)  {
    const [userData, setUserData] = useState<any>(null);
    useEffect(() => {
        const params = new URLSearchParams();

        if (date) params.append("date", date);
        if (star !== undefined) params.append("star", String(star));
        const query = params.toString();
        const url = query ? `/api/fetch?${query}` : `/api/fetch`;
        fetch(url)
        .then(res =>res.json())
        .then(setUserData)
    }, [date,star]);

    if(!userData) return <div className='flex justify-center items-center w-full h-screen'><Loader></Loader></div>
    return (
        <>
            <main className="bg-zinc-950 flex flex-col justify-self-center lg:justify-self-end p-2 rounded-md w-full  min-h-screen">
                <h1 className='text-center text-2xl font-bold font-mono text-violet-300 rounded-t-md bg-indigo-800'>{date ? date : "ALL"}</h1>
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