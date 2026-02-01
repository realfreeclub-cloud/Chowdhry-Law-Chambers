"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash, Eye, EyeOff } from "lucide-react";

export default function PracticeAreasList() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/practice-areas");
            const data = await res.json();
            setItems(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this practice area?")) return;
        await fetch(`/api/practice-areas/${id}`, { method: "DELETE" });
        fetchItems();
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Practice Areas</h1>
                <Link
                    href="/admin/practice-areas/new"
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-800"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Info</th>
                            <th className="p-4">Home</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                <td className="p-4 font-medium text-slate-900">{item.title}</td>
                                <td className="p-4 text-slate-500 text-sm max-w-xs truncate">{item.shortDescription}</td>
                                <td className="p-4">
                                    {item.showOnHome ? (
                                        <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">
                                            <Eye className="w-3 h-3 mr-1" /> Visible
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-bold">
                                            <EyeOff className="w-3 h-3 mr-1" /> Hidden
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link href={`/admin/practice-areas/edit/${item._id}`} className="inline-block p-2 text-blue-600">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} className="inline-block p-2 text-red-600">
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
