'use client'
import React, { useState } from 'react'
import Task from './Task'
import Modal from '@/components/popup/Modal';
import AddTask from '../taskActions/AddTask';

function TaskSection() {
  const [add,setAdd]=useState(false);
  return (
    <>
      <div className='bg-zinc-950 min-h-full w-full'>
        <div>
              <Task></Task>
        </div>
        <aside className={`rounded-sm gap-2  flex flex-col  inset-0 z-20 top-0 fixed justify-self-end self-end m-10 lg:m-20`}>
          <div>
            <button onClick={()=>setAdd(true)} className='bg-blue-400'>add</button>
          </div>              
        </aside>
        {add && (
          <Modal onClose={()=>{setAdd(false)}}>
              <AddTask></AddTask>            
          </Modal>
        )}
      </div>
    </>
  )
}

export default TaskSection
