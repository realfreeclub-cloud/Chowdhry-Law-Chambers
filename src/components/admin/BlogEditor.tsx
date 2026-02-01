"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Eye, FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface EditorProps {
    id?: string;
}

export default function BlogEditor({ id }: EditorProps) {
    const isNew = !id || id === 'new';
    const router = useRouter();
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

    // Gallery Modal State
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        category: "General",
        tags: "", // Comma separated string for input
        author: "Admin",
        status: "Draft",
        publishedAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        seo: {
            metaTitle: "",
            metaDesc: "",
            focusKeyword: "",
        }
    });

    useEffect(() => {
        if (!isNew && id) {
            fetch(`/api/blog/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        alert("Post not found");
                        router.push("/admin/blog");
                    } else {
                        setFormData({
                            ...data,
                            tags: data.tags ? data.tags.join(", ") : "",
                            publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                            seo: data.seo || { metaTitle: "", metaDesc: "", focusKeyword: "" }
                        });
                    }
                    setLoading(false);
                });
        }

        // Fetch gallery images for picker
        fetch("/api/gallery").then(res => res.json()).then(data => {
            if (Array.isArray(data)) setGalleryImages(data);
        });
    }, [id, isNew, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
            publishedAt: formData.publishedAt ? new Date(formData.publishedAt) : null,
        };

        const url = isNew ? "/api/blog" : `/api/blog/${id}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push("/admin/blog");
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

    // Auto-generate slug from title if slug is empty
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        if (isNew && !formData.slug) {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, title, slug }));
        } else {
            setFormData(prev => ({ ...prev, title }));
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <form onSubmit={handleSubmit} className="h-[calc(100vh-100px)] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/blog" className="text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {isNew ? "New Article" : "Edit Article"}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">
                        {formData.status === 'Published' ? 'Live' : 'Draft'}
                    </span>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                        <span>Save</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden h-full">
                {/* Main Content Column */}
                <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden h-full">
                    {/* Title & Slug */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <input
                            type="text"
                            placeholder="Article Title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            className="w-full text-2xl font-bold border-none placeholder-slate-300 focus:ring-0 px-0 mb-2"
                            required
                        />
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="font-mono text-slate-400">/blog/</span>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                className="font-mono border-none focus:ring-0 p-0 text-current w-full"
                                placeholder="slug-goes-here"
                            />
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
                        <div className="border-b border-slate-100 flex">
                            <button
                                type="button"
                                onClick={() => setActiveTab('write')}
                                className={`px-6 py-3 text-sm font-medium ${activeTab === 'write' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                Write
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('preview')}
                                className={`px-6 py-3 text-sm font-medium ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                Preview
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-0 relative">
                            {activeTab === 'write' ? (
                                <textarea
                                    className="w-full h-full p-6 resize-none border-none focus:ring-0 leading-relaxed font-mono text-sm"
                                    placeholder="Write your article in Markdown..."
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                />
                            ) : (
                                <div className="prose prose-slate max-w-none p-6">
                                    <ReactMarkdown>{formData.content}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2 pb-12">
                    {/* Publish Settings */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Publishing</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-lg"
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Published">Published</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Publish Date</label>
                                <input
                                    type="date"
                                    value={formData.publishedAt}
                                    onChange={e => setFormData({ ...formData, publishedAt: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Featured Image</h3>
                        {formData.featuredImage ? (
                            <div className="relative group rounded-lg overflow-hidden border border-slate-200 mb-3">
                                <img src={formData.featuredImage} alt="Featured" className="w-full h-40 object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, featuredImage: "" })}
                                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition shadow-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => setIsGalleryOpen(true)}
                                className="w-full h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-500 cursor-pointer transition"
                            >
                                <ImageIcon className="w-6 h-6 mb-2" />
                                <span className="text-xs font-medium">Select Image</span>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Or paste URL..."
                            value={formData.featuredImage}
                            onChange={e => setFormData({ ...formData, featuredImage: e.target.value })}
                            className="w-full p-2 border border-slate-300 rounded-lg text-sm mt-2"
                        />
                    </div>

                    {/* Organization */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Organization</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Category</label>
                                <input
                                    type="text"
                                    list="categories"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-lg"
                                    placeholder="e.g. Corporate Law"
                                />
                                <datalist id="categories">
                                    <option value="Corporate Law" />
                                    <option value="Family Law" />
                                    <option value="Criminal Defense" />
                                    <option value="General" />
                                </datalist>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tags</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-lg"
                                    placeholder="Separated by commas"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Excerpt</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-lg h-20 text-sm"
                                    placeholder="Short summary..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">SEO Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    value={formData.seo.metaTitle}
                                    onChange={e => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                                    className="w-full p-2 border border-slate-300 rounded-lg"
                                    placeholder="Leave empty to use Title"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Meta Description</label>
                                <textarea
                                    value={formData.seo.metaDesc}
                                    onChange={e => setFormData({ ...formData, seo: { ...formData.seo, metaDesc: e.target.value } })}
                                    className="w-full p-2 border border-slate-300 rounded-lg h-24 text-sm"
                                    placeholder="Search engine summary..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Focus Keyword</label>
                                <input
                                    type="text"
                                    value={formData.seo.focusKeyword}
                                    onChange={e => setFormData({ ...formData, seo: { ...formData.seo, focusKeyword: e.target.value } })}
                                    className="w-full p-2 border border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Picker Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col m-4">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Select Image</h2>
                            <button onClick={() => setIsGalleryOpen(false)} className="px-4 py-2 text-sm">Close</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                            <div className="grid grid-cols-5 gap-4">
                                {galleryImages.map((img) => (
                                    <button
                                        key={img._id}
                                        onClick={() => {
                                            setFormData({ ...formData, featuredImage: img.url });
                                            setIsGalleryOpen(false);
                                        }}
                                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 group"
                                    >
                                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}
