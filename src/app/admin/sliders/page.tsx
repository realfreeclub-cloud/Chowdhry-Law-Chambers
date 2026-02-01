"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash, ArrowUp, ArrowDown } from "lucide-react";

export default function SlidersList() {
    const [sliders, setSliders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSliders = async () => {
        try {
            const res = await fetch("/api/sliders");
            const data = await res.json();
            setSliders(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSliders();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this slider?")) return;
        await fetch(`/api/sliders/${id}`, { method: "DELETE" });
        fetchSliders();
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Homepage Sliders</h1>
                <Link
                    href="/admin/sliders/new"
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-800"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Slide</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 w-24">Image</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Active</th>
                            <th className="p-4">Order</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sliders.map((slider) => (
                            <tr key={slider._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="w-16 h-10 bg-slate-200 rounded overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={slider.imageUrl} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-slate-900">{slider.title}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${slider.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {slider.isActive ? 'Active' : 'Disabled'}
                                    </span>
                                </td>
                                <td className="p-4 font-mono">{slider.order}</td>
                                <td className="p-4 text-right space-x-2">
                                    <Link href={`/admin/sliders/edit/${slider._id}`} className="inline-block p-2 text-blue-600">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button onClick={() => handleDelete(slider._id)} className="inline-block p-2 text-red-600">
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
