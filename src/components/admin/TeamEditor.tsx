"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, User } from "lucide-react";
import Link from "next/link";

interface EditorProps {
    id?: string;
}

export default function TeamEditor({ id }: EditorProps) {
    const isNew = !id;
    const router = useRouter();
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        role: "", // Designation
        experience: "",
        imageUrl: "",
        bio: "",
        email: "",
        linkedinUrl: "",
        order: 0,
    });

    useEffect(() => {
        if (!isNew && id) {
            fetch(`/api/team/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert("Not found");
                        router.push("/admin/team");
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
        const url = isNew ? "/api/team" : `/api/team/${id}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                router.push("/admin/team");
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
                    <Link href="/admin/team" className="text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">{isNew ? "New Member" : "Edit Member"}</h1>
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
                    <div className="flex gap-8">
                        {/* Photo Preview */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                {formData.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                        <User className="w-8 h-8 mb-2" />
                                        <span className="text-xs">No Photo</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-grow space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Experience (e.g. "15 Years")</label>
                                    <input
                                        type="text"
                                        value={formData.experience}
                                        onChange={e => setFormData({ ...formData, experience: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Photo URL</label>
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Bio (Markdown supported)</label>
                            <textarea
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded h-32"
                            />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.linkedinUrl}
                                    onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full p-2 border border-slate-300 rounded"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
