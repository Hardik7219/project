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
      <div>
        {load && (
          <Loader></Loader>
        )}
        <div className='flex flex-col justify-center items-center'>
            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Task Name'></input>
            <input onChange={(e)=>setDetail(e.target.value)} type="text" placeholder='Task Detail'></input>
            <div>
              <label>Daily</label>
              <input value="daily" onChange={(e)=>setRepeated(e.target.value)} type="checkbox"></input>
              <label>Weakly</label>
              <input  value="weekly" onChange={(e)=>setRepeated(e.target.value)} type="checkbox"></input>
              <label>Monthly</label>
              <input  value="monthly"onChange={(e)=>setRepeated(e.target.value)} type="checkbox"></input>
            </div>
            {msg}
            <button onClick={TaskCreate}>Add Task</button>
        </div>
      </div>
    </>
  )
}

export default AddTask
