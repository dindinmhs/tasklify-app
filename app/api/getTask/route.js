import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'
import { today, getLocalTimeZone } from "@internationalized/date"

export async function POST(req) {
    const data = await req.json()
    try {
        const now = today(getLocalTimeZone())
        const db = await connectDB()
        const coll = db.collection('task')
        const task = await coll.find(data).toArray()
        const updatedTasks = task.map(task => {
            return {
                ...task,
                _id: task._id.toString(),
            };
        });
        if (task) {
            task.forEach(async (task)=>{
                if (task.status != 'Completed') {
                    if (now.day > task.date.end.day && now.month >= task.date.end.month && now.year >= task.date.end.year) {
                        await coll.updateOne({_id : task._id},{$set : {status : "Unfinished"}})
                    } else if (now.day > task.date.start.day && now.day < task.date.end.day && now.month > task.date.start.month && now.month < task.date.end.month && now.year > task.date.start.year && now.year < task.date.end.year) {
                        await coll.updateOne({_id : task._id},{$set : {status : "In Progress"}})
                    }
                }
            })
            return NextResponse.json(updatedTasks,{status : 200})
        } else {
            return NextResponse.json({status : 500})
        }
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error: 'failed fetch' }, { status: 500 })
    }
}