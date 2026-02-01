import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Job } from "@/models";

// Public - Get published jobs only
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const admin = searchParams.get("admin");

    await connectDB();

    // Admin view - all jobs
    if (admin === "true") {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const jobs = await Job.find().sort({ postedAt: -1 });
        return NextResponse.json(jobs);
    }

    // Public view - only published and active jobs
    const jobs = await Job.find({ isPublished: true, isActive: true }).sort({ postedAt: -1 });
    return NextResponse.json(jobs);
}

// Admin only - Create job
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await connectDB();
        const newJob = await Job.create(body);
        return NextResponse.json(newJob);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
    }
}
