'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import Task from '../achievements/page'
import ADD from '@/components/addAchievement/ADD';
import { useState } from 'react';
import Modal from '@/components/popup/Modal';

export default function Home() {
    const [sideOptions,setSideOption]=useState<boolean>(false);
    const [add,showAdd]= useState<boolean>(false)
    
    

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
                        border-gray-900 cursor-pointer  text-green-400 text-md font-mono" onClick={()=>showAdd(true)} >Add Achievement</button>
                    </aside>
                    <div className='w-[90%] flex justify-self-center lg:justify-self-end '>
                        <div className=" w-full flex justify-center items-center ">
                            <Task/>
                        </div>
                        {add && (
                            <Modal onClose={() => showAdd(false)} >
                                <ADD></ADD>
                            </Modal>
                        )}
                    </div>

            </div>
        </>
    );
}