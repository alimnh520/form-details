import { connectDB } from "../../../../utils/database";
import bcrypt from "bcrypt";

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        const db = await connectDB();
        const users = db.collection("userpass");
        const user = await users.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found!" }), { status: 404 });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
        }

        return new Response(JSON.stringify({ message: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error logging in!" }), { status: 500 });
    }
}
