'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import Task from '../task/page'
import ADD from '@/components/addtask/ADD';
import { useState } from 'react';
import UPDATE from '@/components/update/UPDATE'; 

export default function Home() {
    const [sideOptions,setSideOption]=useState<boolean>(false);
    const [add,show]= useState<boolean>(false)
    const [comp,setComp]= useState<any>("")
    const Sec : any={
        add:    <ADD/>,
        update: <UPDATE/>,
        dlt:""
    }
    

    return (
        <>
            <div className="w-full bg-gray-950 min-h-screen ">
                    <div className="flex">
                        <div className="lg:hidden h-10">
                            <button className="text-3xl" onClick={()=>{
                                setSideOption(true);
                            }}>{sideOptions ?  "" : <FontAwesomeIcon  icon={faList} />}
                            </button>
                        </div>
                        {sideOptions && (
                            <div className="lg:hidden text-3xl fixed block h-10" onClick={()=>{
                                setSideOption(false);
                            }}><FontAwesomeIcon icon={faList} />
                            </div>
                    )}
                    </div>

                    <aside className={` ${sideOptions ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-1 rounded-sm gap-2 p-4 
                    lg:w-40 flex flex-col h-screen  fixed items-center lg:bg-gray-900 m-2`}>
                        <button className="h-12 w-28 bg-black border rounded-sm
                        border-gray-900 cursor-pointer  text-green-400 text-md font-mono" onClick={()=>{
                        setComp(Sec.add)
                        show(prev=>!prev)}}>{add? "BACK": "ADD"}</button>
                        <button className="h-12 w-28 bg-black border rounded-sm
                        border-gray-900 cursor-pointer  text-orange-400 text-sm font-mono" onClick={()=>{
                            setComp(Sec.update)
                            show(true)
                            }}>custimize</button>
                        <button className="h-12 w-28 bg-black border rounded-sm
                        border-gray-900 cursor-pointer text-md text-red-400 font-mono">Delete</button>
                    </aside>
                    <div className='w-[87%] flex justify-self-center lg:justify-self-end '>
                        <div className=" w-full flex justify-center items-center ">
                            {add?  comp : <Task/>}
                        </div>
                        
                    </div>

            </div>
        </>
    );
}