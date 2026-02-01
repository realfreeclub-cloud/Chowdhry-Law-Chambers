"use client";

import { useEffect, useState } from "react";
import { FileText, User, Mail, Phone, Calendar, ExternalLink, Trash } from "lucide-react";

export default function ApplicationsAdmin() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const res = await fetch("/api/applications");
            const data = await res.json();
            setApplications(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/applications/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            fetchApplications();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this application?")) return;
        await fetch(`/api/applications/${id}`, { method: "DELETE" });
        fetchApplications();
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Job Applications</h1>
                <div className="text-sm text-slate-500">
                    Total: <span className="font-bold text-slate-900">{applications.length}</span>
                </div>
            </div>

            <div className="space-y-4">
                {applications.map((app) => (
                    <div key={app._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-xl font-bold text-slate-900">{app.fullName}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'Reviewed' ? 'bg-blue-100 text-blue-700' :
                                        app.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                                            app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-slate-100 text-slate-700'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>

                                {app.jobId && (
                                    <div className="mb-3 text-sm">
                                        <span className="font-medium text-slate-700">Applied for:</span>{" "}
                                        <span className="text-slate-900 font-bold">{app.jobId.title}</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600 mb-4">
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                        <a href={`mailto:${app.email}`} className="hover:text-[var(--secondary)]">{app.email}</a>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-slate-400" />
                                        <a href={`tel:${app.phone}`} className="hover:text-[var(--secondary)]">{app.phone}</a>
                                    </div>
                                    <div className="flex items-center">
                                        <FileText className="w-4 h-4 mr-2 text-slate-400" />
                                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--secondary)] flex items-center">
                                            View Resume <ExternalLink className="w-3 h-3 ml-1" />
                                        </a>
                                    </div>
                                    <div className="flex items-center text-slate-400">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                {app.coverLetter && (
                                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                                        <p className="text-sm font-medium text-slate-700 mb-1">Cover Letter:</p>
                                        <p className="text-sm text-slate-600">{app.coverLetter}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-slate-100">
                            <button
                                onClick={() => updateStatus(app._id, 'New')}
                                className="px-3 py-1.5 text-xs font-medium rounded bg-slate-100 text-slate-700 hover:bg-slate-200"
                            >
                                New
                            </button>
                            <button
                                onClick={() => updateStatus(app._id, 'Reviewed')}
                                className="px-3 py-1.5 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                            >
                                Reviewed
                            </button>
                            <button
                                onClick={() => updateStatus(app._id, 'Shortlisted')}
                                className="px-3 py-1.5 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200"
                            >
                                Shortlisted
                            </button>
                            <button
                                onClick={() => updateStatus(app._id, 'Rejected')}
                                className="px-3 py-1.5 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200"
                            >
                                Rejected
                            </button>
                            <button
                                onClick={() => handleDelete(app._id)}
                                className="ml-auto px-3 py-1.5 text-xs font-medium rounded bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center"
                            >
                                <Trash className="w-3 h-3 mr-1" /> Delete
                            </button>
                        </div>
                    </div>
                ))}

                {applications.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                        <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No applications yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
