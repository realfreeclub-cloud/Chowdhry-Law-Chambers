"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface EditorProps {
    id?: string;
}

export default function PracticeAreaEditor({ id }: EditorProps) {
    const isNew = !id;
    const router = useRouter();
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        shortDescription: "",
        fullDescription: "",
        imageUrl: "",
        icon: "", // could be lucide icon name
        showOnHome: true,
        order: 0,
    });

    useEffect(() => {
        if (!isNew && id) {
            fetch(`/api/practice-areas/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert("Not found");
                        router.push("/admin/practice-areas");
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
        const url = isNew ? "/api/practice-areas" : `/api/practice-areas/${id}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                router.push("/admin/practice-areas");
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
                    <Link href="/admin/practice-areas" className="text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">{isNew ? "New Area" : "Edit Area"}</h1>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Slug (auto-generated if empty)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
                        <textarea
                            value={formData.shortDescription}
                            onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                            className="w-full p-2 border border-slate-300 rounded h-20"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Description (Markdown/HTML)</label>
                        <textarea
                            value={formData.fullDescription}
                            onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                            className="w-full p-2 border border-slate-300 rounded h-64 font-mono text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Icon Name (Lucide)</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded"
                                placeholder="e.g. Gavel, Briefcase, Scale"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                value={formData.imageUrl}
                                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full p-2 border border-slate-300 rounded"
                            />
                        </div>
                        <div className="flex items-center pt-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.showOnHome}
                                    onChange={e => setFormData({ ...formData, showOnHome: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <span className="text-slate-700 font-medium">Show on Homepage</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
