import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/database";

export async function GET() {
    try {
        const db = await connectDB();
        const collection = db.collection("users");
        const data = await collection.find({}).toArray();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
