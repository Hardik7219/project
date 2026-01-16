'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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
                    <div className='w-full flex justify-self-center lg:justify-self-end '>
                        <div className=" w-full flex justify-center items-center ">
                            <Task/>
                        </div>
                        {add && (
                            <Modal onClose={() => showAdd(false)} >
                                <ADD></ADD>
                            </Modal>
                        )}
                    </div>

                    <aside className={`rounded-sm gap-2   inset-0 z-20 top-0 fixed flex justify-self-end self-end m-10 lg:m-20`}>
                        <div className='p-2 bg-black rounded-full'>
                            <button className="h-10 w-10 lg:h-24 lg:w-24 bg-zinc-900 border rounded-full border-s-indigo-50 cursor-pointer flex justify-center items-center text-3xl hover:border-indigo-600 transition-colors font-mono" onClick={()=>showAdd(true)} ><FontAwesomeIcon icon={faPlus}  className=' text-green-500 hover:text-green-300 hover:scale-120 '></FontAwesomeIcon></button>
                        </div>
                    </aside>
                    

            </div>
        </>
    );
}