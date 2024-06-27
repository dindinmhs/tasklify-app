import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'

export async function POST(req) {
    const data = await req.json()
    try {
        console.log(data)
        const db = await connectDB()
        const coll = db.collection('user')
        const exist = await coll.findOne({_id : data.id})
        if (exist) {
            return NextResponse.json({massage : 'Sign Up'}, {status : 201})
        } else {
            await coll.insertOne(data)
            return NextResponse.json({massage : 'account created'}, {status : 201})
        }
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error: 'failed fetch' }, { status: 500 })
    }
}