'use client'
import Achievement from '@/components/achievementSection/achievement/achievment';
import { useSession } from 'next-auth/react';
import { useEffect,useState } from 'react';
import Loader from '@/components/loader/Loader';
import Link from 'next/link';

export default  function Profile() {
    const [user, setUser] = useState<any>(null);
    const {data:session,status} = useSession()
    useEffect(() => {
        if (status === "authenticated") {
        fetch("/api/fetchUser")
        .then(res => res.json())
        .then(data => setUser(data));
    }}, [status]);
    if (status === "loading" || !user) return <Loader />;
    return (
        <>
            <div className="w-full bg-gray-900 min-h-screen ">
                <div className="w-full bg-gray-800 flex shadow-md shadow-black flex-col justify-end lg:h-98 ">
                    <div className="flex h-50 items-center">
                        <div className={`bg-center bg-cover  rounded-full shadow-md shadow-green-300/50 h-24 w-24 lg:h-56 lg:w-56 m-5 lg:m-5 `}   style={{backgroundImage: `url(${session?.user.avatar})`,}} >
                        </div>
                        <h1 className="font-bold text-2xl border-b-2 shadow-md shadow-cyan-500/50 border-b-blue-600">{user.user.userName}</h1>
                    </div>

                    <div className="flex justify-end p-2 h-10 lg:h-15 w-full w">
                        <button className="bg-blue-800 inset-ring-2 inset-ring-blue-500 px-5 hover:inset-ring-blue-500/50 hover:text-gray-400 rounded-sm"><Link href="/pages/profileEdit">EDIT</Link></button>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                    <Achievement ></Achievement>
                </div>
            </div>
        </>
    );
}