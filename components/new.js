import {DateRangePicker} from "@nextui-org/date-picker"
import { Button } from "./button"
import { useState } from "react"
import { today, getLocalTimeZone } from "@internationalized/date"

export function New({user}) {
    const [data, setData] = useState()
    const [date, setDate] = useState()
    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setData(values => ({...values, [name] : value}))
    }
    async function handleSubmit(user) {
        let now = today(getLocalTimeZone())
        let status
        if (now.day < date.start.day && now.month <= date.start.month && now.year <= date.start.year) {
            status = 'Upcoming'
        } else if (now.day > date.end.day && now.month >= date.end.month && now.year >= date.end.year) {
            status = 'Unfinished'
        } 
        else {
            status = 'In Progress'
        }
        const newData = {user_id : user._id, ...data, date, status : status, completed : false}
        await fetch('http://localhost:3000/api/insertTask', {
            method : 'POST',
            headers : {
                'Content-Type' : 'aplication/json'
            },
            body : JSON.stringify(newData)
        })
    }
    return (
        <>
            <h1 className="text-4xl">New Task</h1>
            <form onSubmit={()=>handleSubmit(user)} className="w-4/6 mt-4">
                <div className="border-4 overflow-hidden border-black rounded-xl px-4 py-2 bg-white">
                    <input name="title" onChange={handleChange} required placeholder="Task Name" className="border-b-4 w-full border-black text-2xl placeholder-black outline-none pb-2" type="text"/>
                    <textarea name="description" onChange={handleChange} rows="5" placeholder="Description" className="resize-none text-xl block w-full outline-none mt-2 placeholder-black"/>
                </div>
                <DateRangePicker
                    label="Deadline"
                    className="w-fit mt-2"
                    variant="underlined"
                    size="lg"
                    onChange={setDate}
                />
                <div className="flex gap-2 justify-end">
                    <Button
                        name="Reset"
                        bgColor="bg-rose-500"
                        type="button"
                        px="px-4"
                        isPending=""
                    />
                    <Button
                        name="Add"
                        bgColor="bg-[#56F35D]"
                        type="submit"
                        px="px-4"
                        isPending=""
                    />
                </div>
            </form>
        </>
    )
}