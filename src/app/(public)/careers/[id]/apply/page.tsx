import { Job } from "@/models";
import connectDB from "@/lib/db";
import { notFound } from "next/navigation";
import ApplicationForm from "@/components/ApplicationForm";

export const dynamic = "force-dynamic";

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;

    const job = await Job.findById(id).lean();

    if (!job || !job.isPublished || !job.isActive) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <ApplicationForm jobId={job._id.toString()} jobTitle={job.title} />
        </main>
    );
}
