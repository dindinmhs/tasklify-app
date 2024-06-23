import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'

export async function POST(req) {
    const data = await req.json()
    try {
        const db = await connectDB()
        const coll = db.collection('user')
        const user = await coll.findOne({ email : data.email, image : data.image })
        if (user) {
            return NextResponse.json(user, {status : 200})
        } else {
            return NextResponse.json({exist : false}, {status : 409})
        }
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error: 'failed fetch' }, { status: 500 })
    }
}