import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Gallery } from "@/models";

export async function GET() {
    try {
        await connectDB();
        const images = await Gallery.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(images);
    } catch (error) {
        console.error("Failed to fetch gallery:", error);
        return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await connectDB();
        const newImage = await Gallery.create(body);
        return NextResponse.json(newImage);
    } catch (error) {
        console.error("Failed to add image:", error);
        return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
    }
}
