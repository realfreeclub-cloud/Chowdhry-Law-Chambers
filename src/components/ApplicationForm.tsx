"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, FileText, MessageSquare, CheckCircle, Upload } from "lucide-react";

interface ApplicationFormProps {
    jobId: string;
    jobTitle: string;
}

export default function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        jobId,
        fullName: "",
        email: "",
        phone: "",
        resumeUrl: "",
        coverLetter: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                alert("Failed to submit. Please try again.");
            }
        } catch {
            alert("Error submitting application.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16 px-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-12">
                    <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h2>
                    <p className="text-slate-600 mb-2">
                        Thank you for applying for <strong>{jobTitle}</strong>.
                    </p>
                    <p className="text-slate-600 mb-8">
                        Our team will review your application and contact you if your qualifications match our requirements.
                    </p>
                    <button
                        onClick={() => router.push("/careers")}
                        className="bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                    >
                        Back to Careers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Apply for {jobTitle}</h1>
                <p className="text-slate-600">Fill out the form below to submit your application.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                <div className="space-y-6">
                    <div>
                        <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                            <User className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                                <Mail className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                                Email Address *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                                <Phone className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                            <Upload className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                            Resume URL *
                        </label>
                        <input
                            type="url"
                            value={formData.resumeUrl}
                            onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                            placeholder="https://drive.google.com/... or https://dropbox.com/..."
                            required
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Upload your resume to Google Drive, Dropbox, or similar service and paste the shareable link here.
                        </p>
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                            <MessageSquare className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                            Cover Letter / Message (Optional)
                        </label>
                        <textarea
                            value={formData.coverLetter}
                            onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                            className="w-full p-3 border border-slate-300 rounded-lg h-32 focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                            placeholder="Tell us why you're interested in this position..."
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--secondary)] text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 mt-8"
                >
                    {loading ? "Submitting..." : "Submit Application"}
                </button>

                <p className="text-sm text-slate-500 text-center mt-4">
                    * Required fields. We are an equal opportunity employer.
                </p>
            </form>
        </div>
    );
}
