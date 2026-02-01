import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { BlogPost } from "@/models";

export async function GET() {
    try {
        await connectDB();
        // Fetch all for admin list (including drafts)
        // For public API, we might want to filter, but this is general use
        const posts = await BlogPost.find().sort({ createdAt: -1 });
        return NextResponse.json(posts);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // Basic slug generation if not provided
        if (!body.slug && body.title) {
            body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        const post = await BlogPost.create(body);
        return NextResponse.json(post);
    } catch (err) {
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
