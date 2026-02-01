"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface EditorProps {
    id?: string;
}

export default function SliderEditor({ id }: EditorProps) {
    const isNew = !id;
    const router = useRouter();
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        imageUrl: "",
        link: "",
        buttonText: "Learn More",
        description: "",
        titleFontSize: "5rem",
        subtitleFontSize: "0.875rem",
        descFontSize: "1.125rem",
        order: 0,
        isActive: true,
    });

    useEffect(() => {
        if (!isNew && id) {
            fetch(`/api/sliders/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert("Slider not found");
                        router.push("/admin/sliders");
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
        const url = isNew ? "/api/sliders" : `/api/sliders/${id}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                router.push("/admin/sliders");
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
                    <Link href="/admin/sliders" className="text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">{isNew ? "New Slide" : "Edit Slide"}</h1>
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

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                        <input
                            type="text"
                            value={formData.subtitle}
                            onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                            className="w-full p-2 border border-slate-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                        <input
                            type="text"
                            value={formData.imageUrl}
                            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="w-full p-2 border border-slate-300 rounded font-mono text-sm"
                            required
                            placeholder="https://..."
                        />
                    </div>
                    {formData.imageUrl && (
                        <div className="h-40 w-full bg-slate-100 rounded overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Button Text</label>
                            <input
                                type="text"
                                value={formData.buttonText}
                                onChange={e => setFormData({ ...formData, buttonText: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Button Link</label>
                            <input
                                type="text"
                                value={formData.link}
                                onChange={e => setFormData({ ...formData, link: e.target.value })}
                                className="w-full p-2 border border-slate-300 rounded"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                                    checked={formData.isActive}
                                    onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <span className="text-slate-700 font-medium">Active</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
