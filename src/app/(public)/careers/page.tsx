import { Job } from "@/models";
import connectDB from "@/lib/db";
import Link from "next/link";
import { Briefcase, MapPin, Clock, ArrowRight, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
    await connectDB();
    const jobs = await Job.find({ isPublished: true, isActive: true }).sort({ postedAt: -1 }).lean();

    return (
        <main>
            {/* Header */}
            <section className="bg-[var(--primary)] py-20 text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold font-[var(--font-heading)] mb-4">Careers</h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Join our team of dedicated legal professionals. We're always looking for talented individuals who share our commitment to excellence.
                </p>
            </section>

            {/* Job Listings */}
            <section className="py-20 px-4 max-w-5xl mx-auto">
                {jobs.length === 0 ? (
                    <div className="text-center py-16">
                        <Briefcase className="w-20 h-20 mx-auto mb-6 text-slate-300" />
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">No Open Positions</h2>
                        <p className="text-slate-600">
                            We don't have any open positions at the moment. Please check back later or send us your resume for future opportunities.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {jobs.map((job: any) => (
                            <div key={job._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-lg transition-shadow group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-[var(--secondary)] transition-colors">
                                                {job.title}
                                            </h2>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.type === 'Full-time' ? 'bg-blue-100 text-blue-700' :
                                                    job.type === 'Internship' ? 'bg-purple-100 text-purple-700' :
                                                        job.type === 'Part-time' ? 'bg-green-100 text-green-700' :
                                                            'bg-orange-100 text-orange-700'
                                                }`}>
                                                {job.type}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                                            {job.department && (
                                                <div className="flex items-center">
                                                    <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                                                    {job.department}
                                                </div>
                                            )}
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                                                {job.location}
                                            </div>
                                            {job.experience && (
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-2 text-slate-400" />
                                                    {job.experience}
                                                </div>
                                            )}
                                            <div className="flex items-center text-slate-400">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                Posted {new Date(job.postedAt).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <p className="text-slate-700 line-clamp-2 mb-4">
                                            {job.description.replace(/<[^>]*>/g, '').substring(0, 200)}...
                                        </p>

                                        <Link
                                            href={`/careers/${job._id}`}
                                            className="inline-flex items-center text-[var(--secondary)] font-bold hover:gap-2 transition-all group"
                                        >
                                            View Details <ArrowRight className="w-4 h-4 ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
