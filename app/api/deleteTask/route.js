import connectDB from "@/utils/connectdb"
import { ObjectId } from "mongodb"
import { NextResponse } from 'next/server'

export async function POST(req) {
    const data = await req.json()
    try {
        const db = await connectDB()
        const coll = db.collection('task')
        if (!data._id) {
            return NextResponse.json({ error: 'No _id provided' }, { status: 400 });
        }
        const id = new ObjectId(data._id);
        const result = await coll.deleteOne({_id : id});
        if (result.deletedCount === 1) {``
            return NextResponse.json({ status: 200 });
        } else {
            return NextResponse.json({ error: 'No document found to delete' }, { status: 404 });
        }
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error: 'failed fetch' }, { status: 500 })
    }
}