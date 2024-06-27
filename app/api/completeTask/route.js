import connectDB from "@/utils/connectdb"
import { ObjectId } from "mongodb"
import { NextResponse } from 'next/server'

export async function POST(req) {
    const data = await req.json()
    try {
        const db = await connectDB()
        const coll = db.collection('task')
        const filter = { _id: new ObjectId(data._id) }
        const update = { $set: { status: "Completed" } };
        await coll.updateOne(filter,update)
        return NextResponse.json({status : 200})
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error: 'failed fetch' }, { status: 500 })
    }
}