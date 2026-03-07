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
  const TaskRepe = await fetch('/api/task',{
    method : 'PATCH',
    headers:{ "Content-Type": "application/json" },
    body : JSON.stringify({isTaskRepe,id})
  })
  const data = await TaskRepe.json()
  setRepe(data)
}

  return (
    <>
        <div className="bg-zinc-950 flex flex-col items-center lg:justify-self-end  rounded-md w-full gap-5 min-h-screen">
          { task?.length ?  (
            task.map((data : any)=>(
              <div key={data._id} className='bg-blue-950 w-[90%] lg:w-full  text-cyan-50 rounded-lg p-2 h-55 lg:h-38'>
                <div className='flex flex-col justify-between'>
                  <div className='h-full flex gap-2 justify-between  '>
                    <p className=' p-2  font-mono'>{data.taskName}</p>
                    <div  className='border h-6 w-6 lg:h-10 lg:w-10 flex justify-center items-center'>
                      <input type="checkbox" onChange={(e)=>isDone(e.target.checked,data._id)} checked={data.isTaskDone}  className='bg-amber-50'></input>
                    </div>
                  </div>
                  <div className='flex flex-col bg-indigo-800 w-[95%] h-15 rounded-sm pr-5 justify-center '>
                    <p className='pl-1  font-mono'>{data.taskDetail}</p>
                  </div>
                </div>
                <div className='flex lg:items-center flex-col lg:flex-row lg:mt-1 gap-2 lg:gap-5 lg:h-10 lg:justify-between pr-2'>
                  <div className='text-sm flex flex-col lg:flex-row lg:text-lg font-mono'>
                    <div>
                      <p className='pr-3'>{data.isTaskRepe ? "streak:-"+data.streak : ""}</p>
                    </div>
                    <div className='flex gap-2 flex-wrap lg:gap-5'>
                      OneTime:-
                      <div className='border h-4 w-4 lg:h-6 lg:w-6 flex justify-center items-center'>
                        <input type="checkbox" className='bg-amber-300'  onChange={(e)=>isRepe(null,data._id)} checked={data.isTaskRepe==null? true:false} ></input>
                      </div>
                      daily:-
                      <div className='border h-4 w-4 lg:h-6 lg:w-6 flex justify-center items-center'>
                        <input type="checkbox" className='bg-amber-300' value="daily" onChange={(e)=>isRepe(e.target.value,data._id)} checked={data.isTaskRepe==="daily"? true:false} ></input>
                      </div>
                      weekly:-
                      <div className='border h-4 w-4 lg:h-6 lg:w-6 flex justify-center items-center'>
                        <input type="checkbox" className='bg-amber-300' value="weekly" onChange={(e)=>isRepe(e.target.value,data._id)} checked={data.isTaskRepe==="weekly"? true:false}></input>
                      </div>
                      monthly:-
                      <div className='border h-4 w-4 lg:h-6 lg:w-6 flex justify-center items-center'>
                        <input type="checkbox" className='bg-amber-300' value="monthly" onChange={(e)=>isRepe(e.target.value,data._id)} checked={data.isTaskRepe==="monthly"? true:false}></input>
                      </div>
                    </div>
                  </div>
                  <div className='text-sm m-1 lg:text-lg font-mono flex justify-center items-center self-end lg:gap-5'>
                    <div className='flex justify-center items-center '>
                      <button className="rounded-sm flex justify-center items-center mr-2 text-lg px-4 bg-red-800 text-white font-bold  shadow-md shadow-red-400/50 " onClick={()=>setdeleteId(data._id)} > delete </button>
                      <button className="rounded-sm flex justify-center items-center mr-2 text-lg px-4 bg-green-700 text-white font-bold  shadow-md shadow-red-400/50  " onClick={()=>setEditId(data._id)}>edit</button>
                    </div>
                  </div>
                  </div>
                  {deleteId && (
                    <Modal onClose={()=>setdeleteId(null)}>
                      <div className=' flex justify-center items-end-safe'>
                          <button className="bg-red-300  w-20 h-10 m-10 rounded-sm text-black font-bold text-lg shadow-lg shadow-green-500/50"  onClick={deleteTask}>YES</button>
                          <button className="bg-green-300 w-20 h-10 m-10 rounded-sm text-black font-bold text-lg shadow-lg shadow-green-500/50"  onClick={()=>setdeleteId(null)}>NO</button>
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
