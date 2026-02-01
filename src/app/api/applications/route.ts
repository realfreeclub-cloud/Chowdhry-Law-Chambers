import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Applicant } from "@/models";
import { validateRequestBody, schemas } from "@/lib/validation";

// Public - Submit application
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input
        const validation = validateRequestBody(body, schemas.application);
        if (!validation.valid) {
            return NextResponse.json({
                error: "Invalid input",
                details: validation.errors
            }, { status: 400 });
        }

        await connectDB();
        const newApplication = await Applicant.create(body);
        return NextResponse.json({ success: true, data: newApplication });
    } catch (error) {
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}

// Admin only - Get all applications
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const searchParams = req.nextUrl.searchParams;
    const jobId = searchParams.get("jobId");

    await connectDB();

    const query = jobId ? { jobId } : {};
    const applications = await Applicant.find(query).sort({ createdAt: -1 }).populate('jobId');
    return NextResponse.json(applications);
}
