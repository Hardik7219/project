import Action from '@/components/Actions/Action';
import { useState } from 'react';
import Modal from '@/components/popup/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function TASK({id,title1,detail,isStar}):any {
        const [showAction, setShowAction] = useState(false);
        const [isStar1,setStar ] = useState<boolean>(!isStar);
        const isAchivDone = async ()=>{
                setStar(current => !current)

            const res = await fetch('/api/achiv',{
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
                    <div className="bg-gray-800 rounded-md mt-2 p-2 min-h-56 h-auto w-[95%]">
                    <div className="w-full">
                        <h1 className="font-bold text-cyan-600 text-lg">{title1}</h1>
                        <p></p>

                    </div>
                    <div className=" p-1 rounded-sm bg-gray-500 mt-2 w-full min-h-30 h-auto text-wrap tracking-tighter overflow-hidden">
                        <p className="font-mono text-amber-100">{detail}</p>
                    </div>
                    <div className="mt-2 flex justify-end p-1">
                        <button onClick={() => setShowAction(true)} className="bg-green-300 mr-2 px-10 rounded-sm text-black font-bold text-2xl">EDIT</button>
                        <div className=' text-2xl'>
                            <FontAwesomeIcon icon={faStar} onClick={isAchivDone} className={`${isStar1 ? 'text-amber-50' :'text-green-500'} hover:scale-115`} />
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