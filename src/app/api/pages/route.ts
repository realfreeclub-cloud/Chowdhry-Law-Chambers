import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Page } from "@/models";

export async function GET() {
    await connectDB();
    // Sort by updatedAt desc
    const pages = await Page.find().sort({ updatedAt: -1 });
    return NextResponse.json(pages);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await connectDB();

        // Basic validation
        if (!body.title || !body.slug) {
            return NextResponse.json({ error: "Title and Slug are required" }, { status: 400 });
        }

        const newPage = await Page.create(body);
        return NextResponse.json(newPage);
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
    }
}
