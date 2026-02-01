"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface EditorProps {
    id?: string;
}

export default function JobEditor({ id }: EditorProps) {
    const isNew = !id;
    const router = useRouter();
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        department: "",
        location: "New York, NY",
        type: "Full-time" as "Full-time" | "Part-time" | "Contract" | "Internship",
        experience: "",
        description: "",
        isActive: true,
        isPublished: false,
    });

    useEffect(() => {
        if (!isNew && id) {
            fetch(`/api/jobs/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert("Not found");
                        router.push("/admin/jobs");
                    } else {
                        setFormData(data);
                    }
                    setLoading(false);
                });
        }
    }, [id, isNew, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const url = isNew ? "/api/jobs" : `/api/jobs/${id}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                router.push("/admin/jobs");
                router.refresh();
            } else {
                alert("Failed to save");
            }
        } catch {
            alert("Error saving");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/jobs" className="text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">{isNew ? "New Job Opening" : "Edit Job"}</h1>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    <span>Save</span>
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Job Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-3 border border-slate-300 rounded-lg"
                            placeholder="e.g. Senior Associate Attorney"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Department / Practice Area</label>
                            <input
                                type="text"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                                className="w-full p-3 border border-slate-300 rounded-lg"
                                placeholder="e.g. Corporate Law"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Location *</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full p-3 border border-slate-300 rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Job Type *</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                className="w-full p-3 border border-slate-300 rounded-lg"
                                required
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Experience Required</label>
                            <input
                                type="text"
                                value={formData.experience}
                                onChange={e => setFormData({ ...formData, experience: e.target.value })}
                                className="w-full p-3 border border-slate-300 rounded-lg"
                                placeholder="e.g. 3-5 years"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Job Description (Markdown/HTML) *</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 border border-slate-300 rounded-lg h-64 font-mono text-sm"
                            placeholder="Detailed job description, responsibilities, requirements..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <span className="text-slate-700 font-medium">Position Open (Accepting Applications)</span>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isPublished}
                                    onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <span className="text-slate-700 font-medium">Publish on Website</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
