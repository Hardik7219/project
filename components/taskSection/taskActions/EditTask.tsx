import React, { useState } from 'react'
import Loader from '@/components/loader/Loader';


function EditTask({ id }: { id: string }) {
  const [name,setName]=useState<string>();
  const [detail,setDetail]=useState<string>();
  const [load,setLoad] = useState<boolean>(false);
  const [msg,setMsg]=useState<string>();

  const TaskUpdate=async (e: React.FormEvent) =>{
    e.preventDefault();
    setLoad(true)
    if(load)return 
    try{
      const formData=new FormData();
      if(name) formData.append("taskName" , name);
      if(detail) formData.append("taskDetail" , detail);
      if (id) formData.append("_id",id);
      
      const task = await fetch('/api/task',{
        method :"PUT",
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
      <div className='flex justify-center items-center'>
        {load && (
          <Loader></Loader>
        )}
        <div className="flex flex-col m-10 p-5 justify-center items-center bg-gray-900 w-70 rounded-2xl h-50">
          <p className="font-mon text-lg  font-bold">EDIT THE ACHIEVEMENT</p>
          {(msg && <p className="text-red-400 font-bold font-sans">{msg}</p>)}
            <form className="p-2 flex justify-center items-center flex-col gap-5" onSubmit={TaskUpdate}>
              <input className=" p-1 w-80 transparent outline-none border-black border-2 rounded-sm text-white" onChange={(e)=>setName(e.target.value)} type="text" placeholder="Task Name" />
              <input className=" transparent resize-none outline-none w-80 border-black border-2 p-1 rounded-sm text-white"  onChange={(e)=>setDetail(e.target.value)} type="text" placeholder="Task Detail" />
              <button className="rounded-sm text-black font-bold p-1 flex justify-center items-center  bg-cyan-500 shadow-lg shadow-cyan-500/50 h-10 w-45 " type="submit">Update Task</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default EditTask
