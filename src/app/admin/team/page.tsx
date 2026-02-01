"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash, User } from "lucide-react";

export default function TeamList() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        try {
            const res = await fetch("/api/team");
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
        if (!confirm("Delete this member?")) return;
        await fetch(`/api/team/${id}`, { method: "DELETE" });
        fetchItems();
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Team Management</h1>
                <Link
                    href="/admin/team/new"
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-800"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Member</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 w-20">Photo</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Designation</th>
                            <th className="p-4">Sort Order</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                                        {item.imageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <User className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-slate-900">{item.fullName}</td>
                                <td className="p-4 text-slate-600">{item.role}</td>
                                <td className="p-4 font-mono">{item.order}</td>
                                <td className="p-4 text-right space-x-2">
                                    <Link href={`/admin/team/edit/${item._id}`} className="inline-block p-2 text-blue-600">
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
