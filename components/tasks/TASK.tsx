import Action from '@/components/Actions/Action';
import { useState } from 'react';


export default function TASK({id,title1,detail}):any {
        const [update,setUpdate] = useState<boolean>(false)
    return (
        <>
            <div className='w-full flex justify-center items-center'>
                <div className="bg-gray-800 rounded-md mt-2 p-2 min-h-56 h-auto w-[95%]">
                                                    <div className="w-full">
                                                        <h1 className="font-bold text-cyan-600 text-lg">{title1}</h1>
                                                        <div className="ml-5 flex justify-end p-1">
                                                            <input type="checkbox" className="h-8 w-8"></input>
                                                        </div>
                                                    </div>
                                                    <div className=" p-1 rounded-sm bg-gray-500 mt-2 w-full min-h-30 h-auto text-wrap tracking-tighter overflow-hidden">
                                                        <p className="font-mono text-amber-100">{detail}</p>
                                                    </div>
                                                    <div className="mt-2 flex justify-end p-1">
                                                        <button onClick={()=>setUpdate((prev)=> !prev)} className="bg-green-300 mr-2 px-10 rounded-sm text-black font-bold text-2xl">EDIT</button>
                                                        Complate:<input type="checkbox" className="h-8 w-8"></input>
                                                    </div>
                                                    {update? <Action id={id}/> : ""} 
                                                </div>
            </div>
        </>
    );
}