import { useEffect, useState } from "react"

export function Overview({tasks}) {
    const [count, setCount] = useState()
    useEffect(()=>{
        const length = [
            {
                label : 'In Progress',
                color : 'bg-[#B1E8FF]',
                count : tasks?.filter(task=>task.status == 'In Progress').length,
            },
            {
                label : 'Upcoming',
                color : 'bg-[#EEABFF]',
                count : tasks?.filter(task=>task.status == 'Upcoming').length,
            },
            {
                label : 'Completed',
                color : 'bg-[#B9F3B4]',
                count : tasks?.filter(task=>task.status == 'Completed').length,
            },
            {
                label : 'Unfinished',
                color : 'bg-[#FF8E8E]',
                count : tasks?.filter(task=>task.status == 'Unfinished').length,
            },
            {
                label : 'Total',
                color : 'bg-[#F9E850]',
                count : tasks?.length,
            }
        ]
        setCount(length)
    },[tasks])
    return (
        <>
            <h1 className="text-4xl mb-6">Task Summary</h1>
            <div className="grid grid-cols-auto-fit w-[100%] gap-4 pb-28 md:mb-0">
                {count?.map(e => (
                    <div key={e.label} className={`${e.color} border-solid border-4 border-black rounded-xl p-4`}>
                        <h2 className="text-3xl mb-2">{e.count?e.count:0}</h2>
                        <p className="text-xl mb-7">{e.label}</p> 
                    </div>
                ))}
            </div>
        </>
    )
}