"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import SectionEditorRegistry from "./sections/SectionEditorRegistry";

interface PageEditorProps {
    id?: string; // If undefined, it's new mode
}

export default function PageEditor({ id }: PageEditorProps) {
    const isNew = !id;
    const router = useRouter();

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        metaDesc: "",
        isPublished: false,
        sections: [] as any[]
    });

    useEffect(() => {
        if (!isNew && id) {
            fetch(`/api/pages/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert("Page not found");
                        router.push("/admin/pages");
                    } else {
                        setFormData({
                            title: data.title,
                            slug: data.slug,
                            metaDesc: data.metaDesc || "",
                            isPublished: data.isPublished,
                            sections: data.sections || []
                        });
                    }
                    setLoading(false);
                });
        }
    }, [id, isNew, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const url = isNew ? "/api/pages" : `/api/pages/${id}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/admin/pages");
                router.refresh();
            } else {
                alert(data.error || "Failed to save");
            }
        } catch (e) {
            alert("Error saving page");
        } finally {
            setSaving(false);
        }
    };

    const addSection = (type: string) => {
        setFormData(prev => ({
            ...prev,
            sections: [...prev.sections, { type, content: {}, order: prev.sections.length }]
        }));
    };

    const removeSection = (index: number) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.filter((_, i) => i !== index)
        }));
    };

    const updateSectionContent = (index: number, contentStr: string) => {
        try {
            // We store as object but edit as JSON string in this simple editor
            const content = JSON.parse(contentStr);
            const newSections = [...formData.sections];
            newSections[index].content = content;
            setFormData(prev => ({ ...prev, sections: newSections }));
        } catch (e) {
            // Allow broken JSON while typing? Hard with controlled input parsing. 
            // For now, simpler: user types in textarea, on blur we parse.
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/pages" className="text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">
                        {isNew ? "Create Page" : "Edit Page"}
                    </h1>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    <span>{isNew ? "Create" : "Save Changes"}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Page Title</label>
                                <input
                                    type="text"
                                    className="w-full p-3 md:p-2 border border-slate-300 rounded text-base"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
                                <input
                                    type="text"
                                    className="w-full p-3 md:p-2 border border-slate-300 rounded font-mono text-sm"
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">SEO Description</label>
                                <textarea
                                    className="w-full p-2 border border-slate-300 rounded h-24"
                                    value={formData.metaDesc}
                                    onChange={e => setFormData({ ...formData, metaDesc: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Simple Section Manager */}
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="mb-4">
                            <h2 className="text-lg md:text-xl font-bold mb-2">Content Sections</h2>
                            <p className="text-xs text-slate-500">Add sections to build your page</p>
                        </div>

                        {/* Section Add Buttons - Mobile Optimized Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap gap-2 mb-6">
                            <button type="button" onClick={() => addSection('HERO_SLIDER')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">🎬</span>
                                <span>Slider</span>
                            </button>
                            <button type="button" onClick={() => addSection('SERVICES_GRID')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">⚖️</span>
                                <span>Services</span>
                            </button>
                            <button type="button" onClick={() => addSection('ABOUT')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">ℹ️</span>
                                <span>About</span>
                            </button>
                            <button type="button" onClick={() => addSection('STATS')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">📊</span>
                                <span>Stats</span>
                            </button>
                            <button type="button" onClick={() => addSection('TESTIMONIALS')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">💬</span>
                                <span>Testimonials</span>
                            </button>
                            <button type="button" onClick={() => addSection('BLOG')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">📝</span>
                                <span>Blog</span>
                            </button>
                            <button type="button" onClick={() => addSection('CLIENT_LOGOS')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">🏢</span>
                                <span>Clients</span>
                            </button>
                            <button type="button" onClick={() => addSection('MAP')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">📍</span>
                                <span>Map</span>
                            </button>
                            <button type="button" onClick={() => addSection('CONTACT_INFO')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">📞</span>
                                <span>Contact Info</span>
                            </button>
                            <button type="button" onClick={() => addSection('CONTACT_DETAILED')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">🏢</span>
                                <span>Contact Detailed</span>
                            </button>
                            <button type="button" onClick={() => addSection('APPOINTMENT')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">📅</span>
                                <span>Appointment</span>
                            </button>
                            <button type="button" onClick={() => addSection('TEXT_BLOCK')} className="flex items-center justify-center gap-1 text-xs md:text-sm bg-slate-100 px-3 py-2.5 md:py-2 rounded-lg hover:bg-slate-200 font-medium transition-colors">
                                <span className="text-lg md:text-base">📄</span>
                                <span>Text</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.sections.map((section, idx) => (
                                <div key={idx} className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
                                    {/* Section Header */}
                                    <div className="bg-slate-50 px-3 md:px-4 py-3 border-b border-slate-200 flex justify-between items-center gap-2">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <span className="bg-slate-200 text-slate-600 text-[10px] md:text-xs font-bold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap">
                                                {section.type}
                                            </span>
                                            <span className="text-xs text-slate-400 hidden sm:inline">Order: {idx}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (idx === 0) return;
                                                    const newSections = [...formData.sections];
                                                    [newSections[idx - 1], newSections[idx]] = [newSections[idx], newSections[idx - 1]];
                                                    setFormData({ ...formData, sections: newSections });
                                                }}
                                                disabled={idx === 0}
                                                className="p-2 md:p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 hover:bg-slate-200 rounded min-w-[36px] md:min-w-0"
                                                title="Move Up"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (idx === formData.sections.length - 1) return;
                                                    const newSections = [...formData.sections];
                                                    [newSections[idx + 1], newSections[idx]] = [newSections[idx], newSections[idx + 1]];
                                                    setFormData({ ...formData, sections: newSections });
                                                }}
                                                disabled={idx === formData.sections.length - 1}
                                                className="p-2 md:p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 hover:bg-slate-200 rounded min-w-[36px] md:min-w-0"
                                                title="Move Down"
                                            >
                                                ↓
                                            </button>
                                            <div className="w-px h-4 bg-slate-200 mx-1"></div>
                                            <button
                                                type="button"
                                                onClick={() => removeSection(idx)}
                                                className="p-2 md:p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded min-w-[36px] md:min-w-0"
                                                title="Remove Section"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Section Content Editor */}
                                    <div className="p-4">
                                        <SectionEditorRegistry
                                            type={section.type}
                                            content={section.content}
                                            onChange={(newContent) => {
                                                const newSections = [...formData.sections];
                                                newSections[idx].content = newContent;
                                                setFormData(prev => ({ ...prev, sections: newSections }));
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {formData.sections.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                                    <p className="text-slate-400 text-sm">No sections added yet.</p>
                                    <p className="text-slate-400 text-xs mt-1">Click a button above to add content.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold mb-4">Publishing</h3>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isPublished}
                                onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <span className="text-slate-700">Published</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
