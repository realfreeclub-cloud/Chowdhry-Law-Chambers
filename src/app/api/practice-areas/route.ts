import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { PracticeArea } from "@/models";

export async function GET() {
    await connectDB();
    const list = await PracticeArea.find().sort({ order: 1 });
    return NextResponse.json(list);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await connectDB();

        // Slug check
        if (body.title && !body.slug) {
            body.slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const newItem = await PracticeArea.create(body);
        return NextResponse.json(newItem);
    } catch (error: any) {
        if (error.code === 11000) return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
