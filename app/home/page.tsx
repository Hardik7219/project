'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import { useState } from "react";

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

                <main className="bg-gray-900 flex justify-self-center lg:justify-self-end p-2 rounded-md w-[90%] min-h-screen">
                    <div className="w-full p-1 lg:w-full bg-gray-800 flex flex-col items-center rounded-sm">
                        <div className="bg-gray-900 mt-2 p-2 min-h-56 h-auto w-[95%]">
                            <div className="w-full">
                                <h1 className="font-bold text-cyan-800 text-lg">TITLE</h1>
                                <div className="ml-5 flex justify-end p-1">
                                    <input type="checkbox" className="h-8 w-8"></input>
                                </div>
                            </div>
                            <div className=" p-1 bg-gray-500 mt-2 w-full min-h-30 h-auto text-wrap tracking-tighter overflow-hidden">
                                <p className="font-mono ">L. Sed saepe possimus dicta quae sit pariatur provident quidem consequuntur, laborum porro digni</p>
                            </div>
                            <div className="mt-2 flex justify-end p-1">
                                <button className="bg-green-300 mr-2 px-10 rounded-sm text-black font-bold text-2xl">EDIT</button>
                                Complate:<input type="checkbox" className="h-8 w-8"></input>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}