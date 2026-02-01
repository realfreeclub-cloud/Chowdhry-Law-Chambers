import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { BlogPost } from "@/models";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const post = await BlogPost.findById(id);
        if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
        return NextResponse.json(post);
    } catch (err) {
        return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();
        const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(post);
    } catch (err) {
        return NextResponse.json({ error: "Error updating post" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        await BlogPost.findByIdAndDelete(id);
        return NextResponse.json({ message: "Post deleted" });
    } catch (err) {
        return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
    }
}
