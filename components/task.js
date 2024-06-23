import { useState } from "react"
import { FaCalendarDays, FaInfo, FaPenToSquare, FaTrash, FaCheck } from "react-icons/fa6"
export function Task({tasks}) {
    const filter = ['All', 'Upcoming', 'In Progress', 'Completed', 'Unfinished']
    const [open, isOpen] = useState(false)
    async function completeTask(id) {
        try {
            const res = await fetch('http://localhost:3000/api/completeTask', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'aplication/json'
                },
                body : JSON.stringify({_id : id})
              })
            if (res.ok) {
                window.location.reload()
            } else {
                console.log('gagal')
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteTask(id) {
        try {
            const res = await fetch('http://localhost:3000/api/deleteTask', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'aplication/json'
                },
                body : JSON.stringify({_id : id})
              })
            if (res.ok) {
                window.location.reload()
            } else {
                console.log('gagal')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="border-4 border-black rounded-full py-2 px-4">
                <input placeholder="Search" type="search" className="outline-none w-full bg-transparent placeholder-black text-xl"/>
            </div>
            <div className="mt-4">
                {filter.map((e, index)=>(<button key={index} className="border-3 border-black rounded-full px-2 mx-2">{e}</button>))}
            </div>
            <div className="grid grid-cols-auto-fit gap-4 mt-4">
                {tasks?.map(e=>(
                <div key={e._id} className={`${
                    e.status == 'In Progress'? 'bg-[#B1E8FF]' :
                    e.status == 'Upcoming'? 'bg-[#EEABFF]' :
                    e.status == 'Completed'? 'bg-[#B9F3B4]' :
                    'bg-[#FF8E8E]'
                } border-solid border-4 border-black rounded-xl p-4 relative`}>
                    <button onClick={()=>isOpen(!open)} className={`${open?'text-white border-white':'text-black border-black'} p-1 z-10 border-3 rounded-full text-sm absolute top-2 right-2`}><FaInfo/></button>
                    <h2 className="text-2xl">{e.title}</h2>
                    <p className="text-xl my-8">{e.status}</p>
                    <div className="flex gap-3">
                        <FaCalendarDays className="text-2xl"/>
                        <p className="text-lg">{e.date?`Due ${e.date.end.day}-${e.date.end.month}-${e.date.end.year}`:'-'}</p>
                    </div>
                    <div className={`${open?'absolute':'hidden'} bg-black text-white absolute top-0 right-0 left-0 bottom-0 px-4 py-2`}>
                        <h2 className="text-xl border-b-3 border-white mb-3 pb-2">Description</h2>
                        <div className="whitespace-normal h-20 overflow-auto">
                            <p className="break-all">{e.description}</p>
                        </div>
                        <div className="text-xl flex justify-end gap-4 mt-3">
                            <button>
                                <FaPenToSquare className="text-amber-500"/>
                            </button>
                            <button onClick={()=>deleteTask(e.id)}>
                                <FaTrash className="text-rose-500"/>
                            </button>
                            <button onClick={()=>completeTask(e._id)}>
                                <FaCheck className="text-green-500"/>
                            </button>
                        </div>
                    </div> 
                </div>
                ))}
            </div>
        </>
    )
}