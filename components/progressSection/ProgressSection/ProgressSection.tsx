import React, { useEffect, useState } from 'react'

function ProgressSection() {
    const [allData,setAllDate] = useState();
useEffect(()=>{
    const getData = async ()=>{
        const data = await fetch("/api/fetchProgress")
        .then(res=>res.json())
        .then(setAllDate)
    }
    getData()
},[])
  return (
    <>
    <div>
        <p>total achiv :-{allData?.achivCount}</p>
        <p>total task:-{allData?.taskCount}</p>
        <p>max Streak:-{allData?.maxStreakDaily} </p>
        <p>star Achiv:-{allData?.starAchiv}</p>
        <p>complete Achiv:-{allData?.completAchiv?.length}</p>
        <p>weekly completAchiv :- {allData?.weeklyCompletAchiv?.length}</p>
    </div>
    <div className=''>

    </div>
    </>
  )
}

export default ProgressSection
