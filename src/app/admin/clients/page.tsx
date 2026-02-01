"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { AdminTableSkeleton } from "@/components/admin/ui/Skeletons";

interface IClient {
    _id: string;
    name: string;
    logoUrl: string;
    isActive: boolean;
    order: number;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<IClient[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<IClient>>({});

    // Gallery Picker State
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<any[]>([]);

    const fetchClients = async () => {
        try {
            const res = await fetch("/api/clients");
            const data = await res.json();
            setClients(Array.isArray(data) ? data : []);
        } finally {
            setLoading(false);
        }
    };

    const fetchGallery = async () => {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (Array.isArray(data)) setGalleryImages(data);
    };

    useEffect(() => {
        fetchClients();
        fetchGallery();
    }, []);

    const handleSave = async () => {
        const isNew = isEditing === 'new';
        const url = isNew ? "/api/clients" : `/api/clients/${isEditing}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                fetchClients();
                setIsEditing(null);
                setEditForm({});
            }
        } catch (err) {
            console.error("Failed to save");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this client?")) return;
        try {
            await fetch(`/api/clients/${id}`, { method: "DELETE" });
            setClients(clients.filter(c => c._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const startEdit = (client: IClient) => {
        setIsEditing(client._id);
        setEditForm(client);
    };

    const startNew = () => {
        setIsEditing('new');
        setEditForm({ name: "", logoUrl: "", isActive: true, order: clients.length + 1 });
    };

    if (loading) return <div className="p-8"><AdminTableSkeleton /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
                    <p className="text-slate-500 mt-1">Manage trusted client logos.</p>
                </div>
                <button
                    onClick={startNew}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-800"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Client</span>
                </button>
            </div>

            {isEditing && (
                <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-[var(--secondary)] animate-in slide-in-from-top-4">
                    <h2 className="font-bold text-lg mb-4">{isEditing === 'new' ? 'Add New Client' : 'Edit Client'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name (Optional)</label>
                                <input
                                    type="text"
                                    value={editForm.name || ""}
                                    onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full p-2 border border-slate-300 rounded-lg"
                                    placeholder="Client Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Logo URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={editForm.logoUrl || ""}
                                        onChange={e => setEditForm(prev => ({ ...prev, logoUrl: e.target.value }))}
                                        className="flex-1 p-2 border border-slate-300 rounded-lg"
                                        placeholder="https://..."
                                    />
                                    <button
                                        onClick={() => setIsGalleryOpen(true)}
                                        className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
                                        title="Select from Gallery"
                                    >
                                        <ImageIcon className="w-5 h-5 text-slate-600" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Order</label>
                                    <input
                                        type="number"
                                        value={editForm.order || 0}
                                        onChange={e => setEditForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                        className="w-full p-2 border border-slate-300 rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                                    <select
                                        value={editForm.isActive ? "Active" : "Inactive"}
                                        onChange={e => setEditForm(prev => ({ ...prev, isActive: e.target.value === "Active" }))}
                                        className="w-full p-2 border border-slate-300 rounded-lg"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                            {editForm.logoUrl ? (
                                <img src={editForm.logoUrl} alt="Preview" className="max-h-32 max-w-full object-contain p-4" />
                            ) : (
                                <span className="text-slate-400 text-sm">Logo Preview</span>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => setIsEditing(null)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-[var(--secondary)] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
                        >
                            <Save className="w-4 h-4" /> Save Client
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 w-20">Logo</th>
                            <th className="p-4">Name</th>
                            <th className="p-4 w-24">Order</th>
                            <th className="p-4 w-32">Status</th>
                            <th className="p-4 w-32 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12">
                                    <EmptyState
                                        title="No Clients Added"
                                        description="Add logos of companies that trust you."
                                        icon={ImageIcon}
                                        actionLabel="Add First Client"
                                        onAction={startNew}
                                    />
                                </td>
                            </tr>
                        ) : (
                            clients.map((client) => (
                                <tr key={client._id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                                    <td className="p-4">
                                        <div className="w-12 h-12 bg-white rounded border border-slate-100 flex items-center justify-center p-1">
                                            <img src={client.logoUrl} alt={client.name} className="max-w-full max-h-full object-contain" />
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-slate-900">{client.name || "—"}</td>
                                    <td className="p-4 text-slate-500">{client.order}</td>
                                    <td className="p-4">
                                        <StatusBadge status={client.isActive ? "published" : "draft"} />
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button
                                            onClick={() => startEdit(client)}
                                            className="text-blue-600 hover:text-blue-800 p-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(client._id)}
                                            className="text-red-600 hover:text-red-800 p-2"
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

            {/* Gallery Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col m-4">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Select Logo</h2>
                            <button onClick={() => setIsGalleryOpen(false)} className="px-4 py-2 text-sm">Close</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                            <div className="grid grid-cols-5 gap-4">
                                {galleryImages.map((img) => (
                                    <button
                                        key={img._id}
                                        onClick={() => {
                                            setEditForm(prev => ({ ...prev, logoUrl: img.url }));
                                            setIsGalleryOpen(false);
                                        }}
                                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 bg-white"
                                    >
                                        <img src={img.url} alt={img.title} className="w-full h-full object-contain p-2" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
