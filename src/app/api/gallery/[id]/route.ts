import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Gallery } from "@/models";
import fs from "fs";
import path from "path";

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();
        const { id } = await context.params;
        const item = await Gallery.findById(id);

        if (item && item.url) {
            // Try to delete file from disk
            try {
                const filename = item.url.split('/').pop();
                if (filename) {
                    const filepath = path.join(process.cwd(), "public/uploads", filename);
                    if (fs.existsSync(filepath)) {
                        fs.unlinkSync(filepath);
                    }
                }
            } catch (err) {
                console.error("Error deleting file:", err);
            }
        }

        await Gallery.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();
        const { id } = await context.params;
        const body = await req.json();

        const existingItem = await Gallery.findById(id);
        if (!existingItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        // If URL is updating and different from old one, try to delete old file
        if (body.url && body.url !== existingItem.url) {
            try {
                const oldFilename = existingItem.url.split('/').pop();
                if (oldFilename) {
                    const oldPath = path.join(process.cwd(), "public/uploads", oldFilename);
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }
            } catch (err) {
                console.error("Failed to cleanup old image:", err);
            }
        }

        const updatedItem = await Gallery.findByIdAndUpdate(
            id,
            {
                $set: {
                    title: body.title || existingItem.title,
                    category: body.category || existingItem.category,
                    url: body.url || existingItem.url,
                    showInGallery: body.showInGallery ?? existingItem.showInGallery
                }
            },
            { new: true }
        );

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
