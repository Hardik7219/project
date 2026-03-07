import React, { useState } from 'react'
import Loader from '@/components/loader/Loader';


function AddTask() {
  const [name,setName]=useState<string>();
  const [detail,setDetail]=useState<string>();
  const [repeated,setRepeated]=useState<string>();
  const [load,setLoad] = useState<boolean>(false);
  const [msg,setMsg]=useState<string>();

  const TaskCreate=async (e: React.FormEvent) =>{
    e.preventDefault();
    setLoad(true)
    if(load)return 
    try{
      const formData=new FormData();
      if(name) formData.append("taskName" , name);
      if(detail) formData.append("taskDetail" , detail);
      if(repeated) formData.append("isTaskRepe" , repeated);

      const task = await fetch('/api/task',{
        method :"POST",
        body: formData
      })  
      const data = await task.json();
      setMsg(data.message);
    } catch (error : any) {
      setMsg(error.message || "Something went wrong")
    }
    finally{
      setLoad(false);
    }
    

  }

  return (
    <>
      <div className="flex  justify-center items-center bg-gray-900 p-5  h-50">
        {load && (
          <Loader></Loader>
        )}
        <div className='flex flex-col justify-center items-center'>
          <p className="font-mon text-2xl font-bold flex justify-center items-center">Add Achievement</p>
            <input className="mb-1 p-1 transparent outline-none w-80 border-black border-2 rounded-sm text-white"  onChange={(e)=>setName(e.target.value)} type="text" placeholder='Task Name'></input>
            <input className=" p-1 transparent outline-none w-80 border-black border-2 rounded-sm text-white"  onChange={(e)=>setDetail(e.target.value)} type="text" placeholder='Task Detail'></input>
            <div className='mt-2 gap-5 flex p-3'>
              <label>Daily</label>
              <input value="daily" onChange={(e)=>setRepeated(e.target.value)} type="checkbox"></input>
              <label>Weakly</label>
              <input  value="weekly" onChange={(e)=>setRepeated(e.target.value)} type="checkbox"></input>
              <label>Monthly</label>
              <input  value="monthly"onChange={(e)=>setRepeated(e.target.value)} type="checkbox"></input>
            </div>
            {msg}
            <button className=" rounded-sm  text-black font-bold flex justify-center items-center  bg-cyan-500 shadow-lg shadow-cyan-500/50 h-10 w-40 " onClick={TaskCreate}>Add Task</button>
        </div>
      </div>
    </>
  )
}

export default AddTask
