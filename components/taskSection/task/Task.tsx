'use client'
import Modal from '@/components/popup/Modal';
import React, { useEffect, useState } from 'react'
import EditTask from '../taskActions/EditTask';

function Task() {
  const [task,setTast]=useState<any[]>();
  const [done,setDone] = useState();
  const [repeated,setRepe] = useState();
  const [deleteId,setdeleteId] = useState<string | null>(null);
  const [editId,setEditId] = useState<string | null>(null);
  const [msg,setMsg]=useState<string | any>();

  useEffect(()=>{
    fetch ('/api/fetchTask')
    .then(res=>res.json())
    .then(data => setTast(data));
},[done,repeated])
const deleteTask=async ()=>
{
  const task = await fetch('/api/task',
    {
      method :"DELETE",
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify({deleteId})
    }
  )
  const data = await task.json();
  setMsg(data.message);
}
const isDone= async (e,id)=>{
  const isTaskDone = e
  setDone(isTaskDone)
  const Taskdone = await fetch('/api/task',{
    method : 'PATCH',
    headers:{ "Content-Type": "application/json" },
    body : JSON.stringify({isTaskDone,id})
  })
}
const isRepe= async (e,id)=>{
  const isTaskRepe = e
  setRepe(isTaskRepe)
  const TaskRepe = await fetch('/api/task',{
    method : 'PATCH',
    headers:{ "Content-Type": "application/json" },
    body : JSON.stringify({isTaskRepe,id})
  })
}
  return (
    <>
        <div className='bg-amber-700 flex flex-col gap-5'>
          { task?.length ?  (
            task.map((data : any)=>(
              <div key={data._id} className='bg-amber-500 w-[70%] border h-30'>
                <div className='flex justify-between'>
                  <div className='h-full flex flex-col gap-2 pl-5'>
                    <p className='p-2 border'>{data.taskName}</p> <p>streak :- {data.streak}</p>
                    <p className='p-2 border'>{data.taskDetail}</p>
                  </div>
                  <div className='flex flex-col pr-5 justify-center '>
                    <input type="checkbox" onChange={(e)=>isDone(e.target.checked,data._id)} checked={data.isTaskDone}  className='bg-amber-50'></input>
                  </div>
                </div>
                <div className='flex gap-5 justify-end pr-2'>
                    daily:-<input type="checkbox" className='bg-amber-300' value="daily" onChange={(e)=>isRepe(e.target.value,data._id)} checked={data.isTaskRepe=="daily"? true:false} ></input>
                    weekly:-<input type="checkbox" className='bg-amber-300' value="weekly" onChange={(e)=>isRepe(e.target.value,data._id)} checked={data.isTaskRepe=="weekly"? true:false}></input>
                    monthly:-<input type="checkbox" className='bg-amber-300' value="monthly" onChange={(e)=>isRepe(e.target.value,data._id)} checked={data.isTaskRepe=="monthly"? true:false}></input>
                    <button onClick={()=>setdeleteId(data._id)} > delete </button>
                    <button onClick={()=>setEditId(data._id)}>edit</button>
                  </div>
                  {deleteId && (
                    <Modal onClose={()=>setdeleteId(null)}>
                      <div className='flex gap-5'>
                          <button className='bg-amber-500 ' onClick={deleteTask}>YES</button>
                          <button className='bg-amber-500 ' onClick={()=>setdeleteId(null)}>NO</button>
                          {msg}
                      </div>
                    </Modal>
                  )}
                  {editId && (
                    <Modal onClose={()=>setEditId(null)}>
                      <EditTask id={editId}/>
                    </Modal>
                  )}
              </div>              
            ))
          ) : (
            <p>no task</p>
          )}
        </div>
    </>
  )
}

export default Task
