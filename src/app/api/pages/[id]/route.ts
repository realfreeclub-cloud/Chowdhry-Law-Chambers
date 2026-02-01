import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Page } from "@/models";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectDB();
    const page = await Page.findById(id);
    if (!page) return NextResponse.json({ error: "Page not found" }, { status: 404 });
    return NextResponse.json(page);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await connectDB();

        const updated = await Page.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ error: "Page not found" }, { status: 404 });

        return NextResponse.json(updated);
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();
        const deleted = await Page.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ error: "Page not found" }, { status: 404 });

        return NextResponse.json({ message: "Page deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
    }
}
