'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faPlus,faStar } from '@fortawesome/free-solid-svg-icons'
import Achievement from './achievment';
import AddAchievement from '../actions/AddAchievement';
import { useState } from 'react';
import Modal from '@/components/popup/Modal';

export default function AchievementSection() {
    const [add,showAdd]= useState<boolean>(false)
    const [date,showDate]= useState<boolean>(false);
    const [selDate,setSelDate]= useState<string | null >("")
    const [selstar,setStar]= useState<boolean>(false)
    return (
        <>
            <div className="w-full bg-gray-950 min-h-screen ">
                    <div className='w-full flex justify-center items-center justify-self-center lg:justify-self-end '>
                        <div className="mt-6 w-full lg:w-[70%] flex justify-center items-center ">
                            <Achievement date={selDate} star={selstar}/>
                        </div>
                        {add && (
                            <Modal onClose={() => showAdd(false)} >
                                <AddAchievement></AddAchievement>
                            </Modal>
                        )}
                        {date && (
                        <Modal onClose={()=>showDate(false)}>
                            <div className='p-2 h-40 w-full bg-black flex flex-col justify-center items-center rounded-md'>
                                <h1 className='text-lg font-bold font-mono text-indigo-400 m-2'>Select Date</h1>
                                <input type="date" className='bg-indigo-600 font-bold font-mono text-shadow-indigo-50 outline-none p-5 text-2xl rounded-2xl  flex justify-end items-center' onChange={(e)=>{setSelDate(e.target.value); showDate(false)}}></input>
                            </div>
                        </Modal>
                        )}
                    </div>

                    <aside className={`rounded-sm gap-2  flex flex-col  inset-0 z-20 top-0 fixed justify-self-end self-end m-10 lg:m-20`}>
                        <div className='p-2 h-11 w-11 lg:h-28 lg:w-28 bg-black flex justify-center items-center rounded-full'>
                            <button onClick={()=>setStar(current => !current)} className="h-10 w-10 lg:h-24 lg:w-24 bg-zinc-900 border rounded-full border-s-indigo-50 cursor-pointer flex justify-center items-center text-3xl hover:border-indigo-600 transition-colors font-mono"><FontAwesomeIcon icon={faStar} className='text-yellow-400 hover:scale-115'/></button>
                        </div>
                        <div className='p-2 h-11 w-11 lg:h-28 lg:w-28 bg-black flex justify-center items-center rounded-full'>
                                <button onClick={()=>showDate(true)} className="h-10 w-10 lg:h-24 lg:w-24 bg-zinc-900 border rounded-full border-s-indigo-50 cursor-pointer flex justify-center items-center text-3xl hover:border-indigo-600 transition-colors font-mono" ><FontAwesomeIcon icon={faCalendar}  className=' text-green-500 hover:text-green-300 hover:scale-120 '></FontAwesomeIcon></button>
                        </div>
                        <div className='p-2 h-11 w-11 lg:h-28 lg:w-28 bg-black flex justify-center items-center rounded-full'>
                            <button className="h-10 w-10 lg:h-24 lg:w-24 bg-zinc-900 border rounded-full border-s-indigo-50 cursor-pointer flex justify-center items-center text-3xl hover:border-indigo-600 transition-colors font-mono" onClick={()=>showAdd(true)} ><FontAwesomeIcon icon={faPlus}  className=' text-green-500 hover:text-green-300 hover:scale-120 '></FontAwesomeIcon></button>
                        </div>
                    </aside>
                    

            </div>
        </>
    );
}