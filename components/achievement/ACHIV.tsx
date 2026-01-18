import Action from '@/components/Actions/Action';
import { useState } from 'react';
import Modal from '@/components/popup/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function TASK({id,title1,detail,isStar,date}:any) {
        const [showAction, setShowAction] = useState<boolean>(false);
        const [isStar1,setStar ] = useState<boolean>(!isStar);
        const today = new Date(date);
        const formatted = today.toISOString().split('T')[0];  
        const [msg,setMsg] = useState<string>('')  
        const [delete1,setDelete]= useState<boolean>(false)
        
        const deleteAchievement= async () =>{
        const res = await fetch('/api/achiv',{
                    method :"DELETE",
                    headers:{ "Content-Type": "application/json" },
                    body: JSON.stringify({id:id}),   
                })
                    const data = await res.json();
                    setMsg(data.message);
                }
        const isAchivDone = async ()=>{
            setStar(current => !current)
            const res = await fetch(`/api/achiv`,{
                method : 'PATCH',
                headers:{ "Content-Type": "application/json" },
                body : JSON.stringify({id : id,isStar : isStar1  })
            })
            const data = await res.json();
            console.log(data)
        }
    return (
        <>
            <div className='w-full flex justify-center items-center'>
                    <div className={`bg-gray-800 rounded-md mt-2 p-2 min-h-56 h-auto w-[95%] ${isStar1 ? "":'shadow-sm shadow-yellow-400 '}`}>
                        {delete1 && (
                            <Modal onClose={() => setDelete(false)}>
                                <div className='flex flex-col justify-center'>
                                    <div className='flex items-center flex-col'>
                                        <h1 className='font-bold font-mono'>DO YOU WANT DELETE</h1>
                                        <h1 className='font-bold text-red-600 font-mono'>{msg}</h1>
                                    </div>
                                    <div className=' flex justify-center items-end-safe'>
                                        <button className="bg-red-300  w-20 h-10 m-10 rounded-sm text-black font-bold text-lg shadow-lg shadow-green-500/50" onClick={deleteAchievement}>YES</button>
                                        <button className="bg-green-300 w-20 h-10 m-10 rounded-sm text-black font-bold text-lg shadow-lg shadow-green-500/50" onClick={()=>setDelete(false)}>CENCEL</button>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    <div className="w-full">
                        <h1 className="font-bold text-cyan-600 text-lg">{title1}</h1>
                        <p className='flex justify-self-end text-teal-400 font-extrabold font-mono self-end'>{formatted}</p>
                    </div>
                    <div className=" p-1 rounded-sm bg-gray-500 mt-2 w-full min-h-30 h-auto text-wrap tracking-tighter overflow-hidden">
                        <p className="font-mono text-amber-100">{detail}</p>
                    </div>
                    <div className="mt-2 flex justify-end p-1">
                        <button className=" rounded-sm flex justify-center items-center mr-2 text-lg px-4 bg-red-500 text-white font-bold  shadow-lg shadow-red-500/50  " onClick={()=>setDelete(true)}>DELETE</button>
                        <button onClick={() => setShowAction(true)} className="bg-green-300 mr-2 px-4 rounded-sm text-black font-bold text-lg shadow-lg shadow-green-500/50 ">EDIT</button>
                        <div className=' text-2xl'>
                            <FontAwesomeIcon icon={faStar} onClick={isAchivDone} className={`${isStar1 ? 'text-amber-50' :'text-yellow-400'} hover:scale-115`} />
                        </div>
                    </div>
                        {showAction && (
                                <Modal onClose={() => setShowAction(false)}>
                                    <Action id={id} onClose={() => setShowAction(false)} /> 
                                </Modal>
                        )}
                    </div>
            </div>
        </>
    );
}