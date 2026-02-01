"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash, Eye, EyeOff, Briefcase, MapPin } from "lucide-react";

export default function JobsList() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/jobs?admin=true");
            const data = await res.json();
            setJobs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this job?")) return;
        await fetch(`/api/jobs/${id}`, { method: "DELETE" });
        fetchJobs();
    };

    const togglePublish = async (id: string, currentStatus: boolean) => {
        await fetch(`/api/jobs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isPublished: !currentStatus }),
        });
        fetchJobs();
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Job Openings</h1>
                <Link
                    href="/admin/jobs/new"
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-800"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Job</span>
                </Link>
            </div>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <div key={job._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${job.type === 'Full-time' ? 'bg-blue-100 text-blue-700' :
                                            job.type === 'Internship' ? 'bg-purple-100 text-purple-700' :
                                                job.type === 'Part-time' ? 'bg-green-100 text-green-700' :
                                                    'bg-orange-100 text-orange-700'
                                        }`}>
                                        {job.type}
                                    </span>
                                    {job.isPublished ? (
                                        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold flex items-center">
                                            <Eye className="w-3 h-3 mr-1" /> Published
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-bold flex items-center">
                                            <EyeOff className="w-3 h-3 mr-1" /> Draft
                                        </span>
                                    )}
                                    {!job.isActive && (
                                        <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold">Closed</span>
                                    )}
                                </div>

                                <div className="flex gap-4 text-sm text-slate-600 mb-3">
                                    {job.department && (
                                        <div className="flex items-center">
                                            <Briefcase className="w-4 h-4 mr-1 text-slate-400" />
                                            {job.department}
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                                        {job.location}
                                    </div>
                                    {job.experience && (
                                        <div className="text-slate-500">
                                            Experience: {job.experience}
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm text-slate-500">
                                    Posted: {new Date(job.postedAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => togglePublish(job._id, job.isPublished)}
                                    className={`p-2 rounded ${job.isPublished ? 'text-green-600 hover:bg-green-50' : 'text-slate-400 hover:bg-slate-50'}`}
                                    title={job.isPublished ? 'Unpublish' : 'Publish'}
                                >
                                    {job.isPublished ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                </button>
                                <Link href={`/admin/jobs/edit/${job._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                    <Edit className="w-5 h-5" />
                                </Link>
                                <button onClick={() => handleDelete(job._id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                                    <Trash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {jobs.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                        <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No job openings yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
