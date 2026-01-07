'use client'
export default function Task() {
    return (
        <>
            <main className="bg-gray-900 flex justify-self-center lg:justify-self-end p-2 rounded-md w-full min-h-screen">
                    <div className="w-full p-1 lg:w-full bg-gray-800 flex flex-col items-center rounded-sm">
                        <div className="bg-gray-900 mt-2 p-2 min-h-56 h-auto w-[95%]">
                            <div className="w-full">
                                <h1 className="font-bold text-cyan-800 text-lg">TITLE</h1>
                                <div className="ml-5 flex justify-end p-1">
                                    <input type="checkbox" className="h-8 w-8"></input>
                                </div>
                            </div>
                            <div className=" p-1 bg-gray-500 mt-2 w-full min-h-30 h-auto text-wrap tracking-tighter overflow-hidden">
                                <p className="font-mono ">L. Sed saepe possimus dicta quae sit pariatur provident quidem consequuntur, laborum porro digni</p>
                            </div>
                            <div className="mt-2 flex justify-end p-1">
                                <button className="bg-green-300 mr-2 px-10 rounded-sm text-black font-bold text-2xl">EDIT</button>
                                Complate:<input type="checkbox" className="h-8 w-8"></input>
                            </div>
                        </div>
                    </div>
                </main>
        </>
    );
}