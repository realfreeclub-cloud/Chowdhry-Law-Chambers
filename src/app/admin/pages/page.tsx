"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash, FileText, Globe } from "lucide-react";

export default function PagesList() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPages = async () => {
        try {
            const res = await fetch("/api/pages", { cache: "no-store" });
            const data = await res.json();
            setPages(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this page?")) return;
        try {
            const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchPages();
            } else {
                alert("Failed to delete");
            }
        } catch (err) {
            alert("Error deleting page");
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Pages</h1>
                <Link
                    href="/admin/pages/new"
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-800"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Page</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-700">Title</th>
                            <th className="p-4 font-semibold text-slate-700">Slug</th>
                            <th className="p-4 font-semibold text-slate-700">Status</th>
                            <th className="p-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-slate-500">
                                    No pages found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            pages.map((page) => (
                                <tr key={page._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                    <td className="p-4 font-medium text-slate-900">{page.title}</td>
                                    <td className="p-4 text-slate-600 font-mono text-sm">/{page.slug}</td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${page.isPublished
                                                ? "bg-green-100 text-green-700"
                                                : "bg-amber-100 text-amber-700"
                                                }`}
                                        >
                                            {page.isPublished ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link
                                            href={`/${page.slug}`}
                                            target="_blank"
                                            className="inline-block p-2 text-slate-400 hover:text-slate-900"
                                            title="View Live"
                                        >
                                            <Globe className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/pages/editor/${page._id}`}
                                            className="inline-block p-2 text-blue-600 hover:text-blue-800"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(page._id)}
                                            className="inline-block p-2 text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <Trash className="w-4 h-4" />
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
