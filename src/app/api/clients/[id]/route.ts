import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Client } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        await connectDB();
        const body = await req.json();

        const client = await Client.findByIdAndUpdate(id, body, { new: true });
        if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

        return NextResponse.json(client);
    } catch (err) {
        return NextResponse.json({ error: "Failed to update client" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        await connectDB();
        const client = await Client.findByIdAndDelete(id);

        if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Failed to delete client" }, { status: 500 });
    }
}
