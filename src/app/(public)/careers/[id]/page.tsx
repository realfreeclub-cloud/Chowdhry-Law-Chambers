import { Job } from "@/models";
import connectDB from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Clock, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    await connectDB();
    const { id } = await params;
    const job = await Job.findById(id).lean();

    if (!job || !job.isPublished || !job.isActive) {
        return {
            title: "Job Not Found",
        };
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const description = job.description.replace(/<[^>]*>/g, '').substring(0, 160);

    return {
        title: `${job.title} | Careers`,
        description,
        openGraph: {
            title: `${job.title} - ${job.type}`,
            description,
            url: `${baseUrl}/careers/${job._id}`,
            siteName: 'Law Firm',
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title: `${job.title} - ${job.type}`,
            description,
        },
    };
}

export default async function JobDetail({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;

    const job = await Job.findById(id).lean();

    if (!job || !job.isPublished || !job.isActive) {
        notFound();
    }

    return (
        <main>
            {/* Hero */}
            <section className="bg-[var(--primary)] py-20 text-white px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/careers" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Careers
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold font-[var(--font-heading)] mb-6">
                        {job.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-slate-200">
                        {job.department && (
                            <div className="flex items-center">
                                <Briefcase className="w-5 h-5 mr-2" />
                                {job.department}
                            </div>
                        )}
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            {job.location}
                        </div>
                        {job.experience && (
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-2" />
                                {job.experience}
                            </div>
                        )}
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            Posted {new Date(job.postedAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="prose prose-lg max-w-none text-slate-700">
                        <ReactMarkdown>{job.description}</ReactMarkdown>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 sticky top-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 font-[var(--font-heading)]">Apply Now</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between py-2 border-b border-slate-200">
                                <span className="text-slate-600">Type</span>
                                <span className="font-bold text-slate-900">{job.type}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-slate-200">
                                <span className="text-slate-600">Location</span>
                                <span className="font-bold text-slate-900">{job.location}</span>
                            </div>
                            {job.experience && (
                                <div className="flex items-center justify-between py-2 border-b border-slate-200">
                                    <span className="text-slate-600">Experience</span>
                                    <span className="font-bold text-slate-900">{job.experience}</span>
                                </div>
                            )}
                        </div>

                        <Link
                            href={`/careers/${job._id}/apply`}
                            className="block w-full text-center bg-[var(--secondary)] text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg mb-4"
                        >
                            Apply for this Position
                        </Link>

                        <p className="text-xs text-slate-500 text-center">
                            We are an equal opportunity employer
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
