import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/database";
import { ObjectId } from "mongodb";

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        const db = await connectDB();
        const collection = db.collection("landtaxes");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "No document found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Document deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
    }
}
