"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Eye, FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EditorProps {
    id?: string;
}

// Quill toolbar configuration
const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image", "video"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["code-block"],
        ["clean"],
    ],
};

const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
    "code-block",
];

export default function BlogEditor({ id }: EditorProps) {
    const isNew = !id || id === 'new';
    const router = useRouter();
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

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

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setFormData(prev => ({
            ...prev,
            title: newTitle,
            slug: prev.slug || newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        }));
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <form onSubmit={handleSubmit} className="h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <Link href="/admin/blog" className="text-slate-500 hover:text-slate-900">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">
                        {isNew ? "New Article" : "Edit Article"}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    <span>Save</span>
                </button>
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

                    {/* Rich Text Editor */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
                        <div className="border-b border-slate-100 px-6 py-3">
                            <h3 className="font-semibold text-slate-900">Content</h3>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={(value) => setFormData({ ...formData, content: value })}
                                modules={quillModules}
                                formats={quillFormats}
                                className="h-full quill-editor"
                                placeholder="Write your article content here..."
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Excerpt</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full p-3 border border-slate-300 rounded-lg text-sm h-24 resize-none"
                            placeholder="Brief summary of the article..."
                        />
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
                        <button
                            type="button"
                            onClick={() => setIsGalleryOpen(true)}
                            className="w-full mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {formData.featuredImage ? "Change Image" : "Browse Gallery"}
                        </button>
                    </div>

                    {/* Category & Tags */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Taxonomy</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                                    placeholder="e.g., Corporate Law"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tags</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                                    placeholder="tag1, tag2, tag3"
                                />
                                <p className="text-xs text-slate-400 mt-1">Separate with commas</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Author</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">SEO</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    value={formData.seo.metaTitle}
                                    onChange={e => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                                    placeholder="SEO title"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Meta Description</label>
                                <textarea
                                    value={formData.seo.metaDesc}
                                    onChange={e => setFormData({ ...formData, seo: { ...formData.seo, metaDesc: e.target.value } })}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm h-20 resize-none"
                                    placeholder="SEO description"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Focus Keyword</label>
                                <input
                                    type="text"
                                    value={formData.seo.focusKeyword}
                                    onChange={e => setFormData({ ...formData, seo: { ...formData.seo, focusKeyword: e.target.value } })}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                                    placeholder="Primary keyword"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Select Image</h2>
                            <button
                                type="button"
                                onClick={() => setIsGalleryOpen(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {galleryImages.map((img) => (
                                    <div
                                        key={img._id}
                                        onClick={() => {
                                            setFormData({ ...formData, featuredImage: img.url });
                                            setIsGalleryOpen(false);
                                        }}
                                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-slate-200 hover:border-blue-500 cursor-pointer transition group"
                                    >
                                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                                            <span className="text-white opacity-0 group-hover:opacity-100 font-medium">Select</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .quill-editor {
                    display: flex;
                    flex-direction: column;
                }
                .quill-editor .ql-container {
                    flex: 1;
                    overflow-y: auto;
                    font-size: 16px;
                    font-family: inherit;
                }
                .quill-editor .ql-editor {
                    min-height: 300px;
                    padding: 20px;
                }
                .quill-editor .ql-editor.ql-blank::before {
                    color: #cbd5e1;
                    font-style: normal;
                }
                .ql-toolbar {
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: 1px solid #e2e8f0 !important;
                    background: #f8fafc;
                }
                .ql-container {
                    border: none !important;
                }
            `}</style>
        </form>
    );
}
