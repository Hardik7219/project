'use client'
import Task from '../task/page'
import { useSession } from 'next-auth/react';
export default function ProfileEdit() {
    const {data: session}= useSession();
    return (
        <>
            <div className="bg-amber-50 fixed inset-0 z-50 h-screen w-full">
                <div className="bg-amber-400">
                    <div className="bg-amber-950 ">
                        <div className="bg-gray-400 mb-10 p-10 flex ">
                            <div className="bg-amber-50 h-60 w-60">
                                <div className="bg-blue-950 h-40 w-40 rounded-full"></div>
                            </div>
                            <div className="bg-amber-300 h-60 w-60">
                                <form>
                                    <input type="text" className="bg-amber-50 text-black" placeholder={session?.user.userName}></input>
                                </form>
                            </div>
                        </div>
                        <div className="bg-cyan-600">
                            <Task></Task>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}