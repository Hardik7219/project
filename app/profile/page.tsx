'use client'
import Task from '../task/page'
export default  function Profile() {

    return (
        <>
            <div className="w-full p-2 bg-amber-50 min-h-screen ">
                <div className="w-full bg-amber-950 flex flex-col justify-end lg:h-98 ">
                    <div className="flex  items-center">
                        <div className="bg-amber-500 h-56 w-56 rounded-full m-5"></div>
                        <h1 className="font-bold text-2xl"></h1>
                    </div>

                    <div className="flex justify-end p-2 bg-amber-400 h-15 w-full w">
                        <button className="bg-blue-800 p-2 rounded-sm">EDIT</button>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                    <Task></Task>
                </div>
            </div>
        </>
    );
}