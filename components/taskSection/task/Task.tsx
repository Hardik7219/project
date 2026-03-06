'use client'
import { PATCH } from '@/app/api/achiv/route';
import React, { useEffect, useState } from 'react'

function Task() {
  const [task,setTast]=useState<any[]>();
  const [done,setDone] = useState();
  useEffect(()=>{
    fetch ('/api/fetchTask')
    .then(res=>res.json())
    .then(data => setTast(data));
},[done])
const isDone= async (e,id)=>{
  const isTaskDone = e
  setDone(isTaskDone)
  const Taskdone = await fetch('/api/task',{
    method : 'PATCH',
    headers:{ "Content-Type": "application/json" },
    body : JSON.stringify({isTaskDone,id})
  })
}
  return (
    <>
        <div className='bg-amber-700 flex flex-col gap-5'>
          { task && (
            task.map((data : any)=>(
              <div key={data._id} className='bg-amber-500 w-[70%] border h-30'>
                <div className='flex justify-between'>
                  <div className='h-full flex flex-col gap-2 pl-5'>
                    <p className='p-2 border'>{data.taskName}</p>
                    <p className='p-2 border'>{data.taskDetail}</p>
                  </div>
                  <div className='flex flex-col pr-5 justify-center '>
                    <input type="checkbox" onChange={(e)=>isDone(e.target.checked,data._id)} checked={data.isTaskDone}  className='bg-amber-50'></input>
                  </div>
                </div>
                <div className='flex gap-5 justify-end pr-2'>
                    <input type="checkbox" className='bg-amber-300'></input>
                    <button>delete</button>
                    <button>edit</button>
                  </div>
              </div>              
            ))
          )}
        </div>
    </>
  )
}

export default Task
