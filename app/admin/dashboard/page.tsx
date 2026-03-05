'use client'
import React, { useEffect, useState } from 'react'


// type AdminData = {
//   userData: number
//   achivData: number
// }

function AdminDashboard() {
  const [data,setData]= useState<any>();
  useEffect(()=>{
    const data1= fetch('/api/admin',{
      method : "GET"
    })
    .then(res=> res.json())
    .then(data => setData(data))
  },[])
  return (
    <>
        <div>
          <p>Total user:-{data?.userData}</p>
          <p>Total achievements:-{data?.achiData}</p>
        </div>
    </>
  )
}

export default AdminDashboard
