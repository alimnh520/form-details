import connectDB from "../../../../utils/database";
import bcrypt from "bcrypt";

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        const db = await connectDB();
        const users = db.collection("userpass");

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists!" }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await users.insertOne({ email, password: hashedPassword });

        return new Response(JSON.stringify({ message: "User registered successfully!" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error registering user!" }), { status: 500 });
    }
}
