import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'

export async function POST(req) {
    const data = await req.json()
    try {
        const db = await connectDB()
        const coll = db.collection('task')
        await coll.insertOne(data)
        return NextResponse.json({status : 200})
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error: 'failed fetch' }, { status: 500 })
    }
}