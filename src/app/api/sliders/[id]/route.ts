import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Slider } from "@/models";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectDB();
    const slider = await Slider.findById(id);
    if (!slider) return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    return NextResponse.json(slider);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await connectDB();

        const updated = await Slider.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update slider" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();
        await Slider.findByIdAndDelete(id);
        return NextResponse.json({ message: "Slider deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete slider" }, { status: 500 });
    }
}
