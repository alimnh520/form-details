import { MongoClient } from "mongodb";

const uri = "mongodb+srv://alimnh412:jSyAOieDZhwrzmZG@my-form.quhvg.mongodb.net/?retryWrites=true&w=majority&appName=my-form";
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectDB() {
    const client = await clientPromise;
    return client.db("test");
}
