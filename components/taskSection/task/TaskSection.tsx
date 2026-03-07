'use client'
import React, { useState } from 'react'
import Task from './Task'
import Modal from '@/components/popup/Modal';
import AddTask from '../taskActions/AddTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function TaskSection() {
  const [add,setAdd]=useState(false);
  return (
    <>
    <div  className="w-full bg-gray-950 min-h-screen ">
      <div className='w-full flex justify-center items-center justify-self-center lg:justify-self-end '>

        <div className="mt-6 w-full lg:w-[70%] flex justify-center items-center ">
              <Task></Task>
        </div>
        <aside className={`rounded-sm gap-2  flex flex-col  inset-0 z-20 top-0 fixed justify-self-end self-end m-10 lg:m-20`}>
          <div>
            <button className="h-10 w-10 lg:h-24 lg:w-24 bg-zinc-900 border rounded-full border-s-indigo-50 cursor-pointer flex justify-center items-center text-3xl hover:border-indigo-600 transition-colors font-mono" onClick={()=>setAdd(true)} ><FontAwesomeIcon icon={faPlus}  className=' text-green-500 hover:text-green-300 hover:scale-120 '></FontAwesomeIcon></button>
          </div>              
        </aside>
        {add && (
          <Modal onClose={()=>{setAdd(false)}}>
              <AddTask></AddTask>            
          </Modal>
        )}
        </div>
      </div>
    </>
  )
}

export default TaskSection
