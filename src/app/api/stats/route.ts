import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Page, PracticeArea, TeamMember, Job, Appointment, Applicant, BlogPost } from "@/models";

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();

        const [
            pagesCount,
            practiceAreasCount,
            teamCount,
            jobsCount,
            appointmentsCount,
            applicantsCount,
            blogPostsCount
        ] = await Promise.all([
            Page.countDocuments(),
            PracticeArea.countDocuments(),
            TeamMember.countDocuments(),
            Job.countDocuments(),
            Appointment.countDocuments(),
            Applicant.countDocuments(),
            BlogPost.countDocuments()
        ]);

        return NextResponse.json({
            pages: pagesCount,
            practiceAreas: practiceAreasCount,
            team: teamCount,
            jobs: jobsCount,
            appointments: appointmentsCount,
            applications: applicantsCount,
            articles: blogPostsCount
        });
    } catch (error) {
        console.error("Stats fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
