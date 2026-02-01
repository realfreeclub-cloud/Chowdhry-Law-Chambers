"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Calendar, FileText } from "lucide-react";
import { AdminTableSkeleton } from "@/components/admin/ui/Skeletons";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

export default function BlogList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog", { cache: "no-store" });
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
            if (res.ok) {
                setPosts(posts.filter(p => p._id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (err) {
            alert("Error deleting post");
        }
    };

    if (loading) return <div className="p-8"><AdminTableSkeleton /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Articles</h1>
                    <p className="text-slate-500 mt-1">Manage your blog content and SEO.</p>
                </div>
                <Link
                    href="/admin/blog/editor/new"
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-800"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Article</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-700">Title</th>
                            <th className="p-4 font-semibold text-slate-700">Status</th>
                            <th className="p-4 font-semibold text-slate-700">Category</th>
                            <th className="p-4 font-semibold text-slate-700">Date</th>
                            <th className="p-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12">
                                    <EmptyState
                                        title="No articles found"
                                        description="Start writing your first blog post to improve SEO and engage clients."
                                        actionLabel="Write Article"
                                        actionLink="/admin/blog/editor/new"
                                        icon={FileText}
                                    />
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                    <td className="p-4">
                                        <div className="font-medium text-slate-900">{post.title}</div>
                                        <div className="text-xs text-slate-500 font-mono mt-0.5">/{post.slug}</div>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={post.status} />
                                    </td>
                                    <td className="p-4 text-slate-600 text-sm">
                                        {post.category || "General"}
                                    </td>
                                    <td className="p-4 text-slate-600 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "-"}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            target="_blank"
                                            className="inline-block p-2 text-slate-400 hover:text-slate-900"
                                            title="View Live"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/blog/editor/${post._id}`}
                                            className="inline-block p-2 text-blue-600 hover:text-blue-800"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="inline-block p-2 text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
