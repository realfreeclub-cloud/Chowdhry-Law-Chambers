import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { SiteConfig } from "@/models";

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        await connectDB();

        // We assume singleton config with ID or just update the first one found
        const updated = await SiteConfig.findOneAndUpdate({}, body, {
            new: true,
            upsert: true
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update config" }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    const config = await SiteConfig.findOne();
    return NextResponse.json(config);
}
