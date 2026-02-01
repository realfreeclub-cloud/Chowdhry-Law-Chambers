import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { TeamMember } from "@/models";

export async function GET() {
    await connectDB();
    const list = await TeamMember.find().sort({ order: 1 });
    return NextResponse.json(list);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await connectDB();
        const newItem = await TeamMember.create(body);
        return NextResponse.json(newItem);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
