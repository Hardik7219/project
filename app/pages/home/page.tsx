'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Task from '../task/page'
import { useState } from "react";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export default function Home() {
    const [sideOptions,setSideOption]=useState<boolean>(false);

    return (
        <>
            <div className="w-full bg-gray-900 min-h-screen ">
                    <div className="flex">
                        <div className="lg:hidden h-10">
                            <button onClick={()=>{
                                setSideOption(true);
                            }}>{sideOptions ?  "" : <FontAwesomeIcon icon={faList} />}
                            </button>
                        </div>
                        {sideOptions && (
                            <div className="lg:hidden fixed block h-10" onClick={()=>{
                                setSideOption(false);
                            }}><FontAwesomeIcon icon={faList} />
                            </div>
                    )}
                    </div>

                    <aside className={` ${sideOptions ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-1 rounded-sm gap-2 p-4 
                    lg:w-40 flex flex-col h-screen  fixed items-center lg:bg-gray-800 m-2`}>
                        <button className="h-14 w-28 bg-green-400 border rounded-sm
                        border-[#f39c12] cursor-pointer text-2xl font-bold">ADD</button>
                        <button className="h-14 w-28 bg-[#e67e22] border rounded-sm
                        border-[#f39c12] cursor-pointer text-2xl font-bold">custimize</button>
                        <button className="h-14 w-28 bg-red-500 border rounded-sm
                        cursor-pointer text-2xl font-bold">Delete</button>
                    </aside>
                    <div className='w-[90%] flex justify-self-center lg:justify-self-end p-2'>
                        <Task></Task>
                    </div>

            </div>
        </>
    );
}