import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
    const { database } = await connectToDatabase(); // Connect to database
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const results = await collection.find({}).toArray();

    return Response.json(results);
}

export async function POST(request) {
    const content = request.headers.get('content-type')

    if (content != 'application/json')
        return Response.json({ message: 'Debes proporcionar datos JSON' }) // Return error

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION)

    const { name, price, date_inventory, image } = await request.json() // Read body request
    const results = await collection.insertOne({ name, price, date_inventory, image });

    return Response.json(results) // Return response
}