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
      <div>
        {load && (
          <Loader></Loader>
        )}
        <div className='flex flex-col justify-center items-center'>
            <form onSubmit={TaskUpdate}>
              <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Task Name" />
              <input onChange={(e)=>setDetail(e.target.value)} type="text" placeholder="Task Detail" />

              <p>{msg}</p>

              <button type="submit">Update Task</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default EditTask
