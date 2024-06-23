import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'
import bcrypt from "bcrypt"

export async function POST(req) {
    let {password, ...data} = await req.json()
    const hashedPassword = await bcrypt.hash(password,10)
    const newData = {...data, password : hashedPassword}
    try {
        const db = await connectDB()
        const coll = db.collection('user')
        coll.insertOne(newData)
        return NextResponse.json({massage : 'account created'}, {status : 201})
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error: 'failed fetch' }, { status: 500 })
    }
}