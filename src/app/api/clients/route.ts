import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Client } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        await connectDB();
        const clients = await Client.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(clients);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const body = await req.json();

        // Simple order handling: append to end
        const count = await Client.countDocuments();
        const client = await Client.create({ ...body, order: count + 1 });

        return NextResponse.json(client);
    } catch (err) {
        return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
    }
}
