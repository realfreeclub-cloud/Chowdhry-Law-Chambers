"use client";

import { useEffect, useState } from "react";
import {
    Upload, Trash2, Eye, EyeOff, Plus, Loader2, Image as ImageIcon,
    MoreVertical, Check, X, Copy, CheckCircle, Pencil
} from "lucide-react";

interface GalleryItem {
    _id: string;
    title: string;
    url: string;
    category: string;
    showInGallery: boolean;
    createdAt: string;
}

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Upload/Edit State
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [newImageTitle, setNewImageTitle] = useState("");
    const [newImageCategory, setNewImageCategory] = useState("General");

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/gallery");
            if (res.ok) {
                const data = await res.json();
                setImages(data);
            }
        } catch (error) {
            console.error("Failed to fetch gallery:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setNewImageTitle(file.name.split('.')[0]); // Default title to filename
        }
    };

    const openEditModal = (item: GalleryItem) => {
        setEditingItem(item);
        setNewImageTitle(item.title);
        setNewImageCategory(item.category);
        setSelectedFile(null); // Reset file input
        setIsUploadModalOpen(true);
    };

    const openUploadModal = () => {
        setEditingItem(null);
        setNewImageTitle("");
        setNewImageCategory("General");
        setSelectedFile(null);
        setIsUploadModalOpen(true);
    };

    const handleSave = async () => {
        if (!newImageTitle) return;
        // For new uploads, file is required. For edits, it's optional (only if changing image)
        if (!editingItem && !selectedFile) return;

        setUploading(true);
        try {
            let imageUrl = editingItem?.url || "";

            // 1. Upload File if selected
            if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) throw new Error("Upload failed");
                const uploadData = await uploadRes.json();
                imageUrl = uploadData.url;
            }

            // 2. Create or Update Record
            const method = editingItem ? "PUT" : "POST";
            const url = editingItem ? `/api/gallery/${editingItem._id}` : "/api/gallery";

            const payload = {
                title: newImageTitle,
                category: newImageCategory,
                url: imageUrl,
                showInGallery: editingItem ? editingItem.showInGallery : true
            };

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                fetchImages();
                setIsUploadModalOpen(false);
                setEditingItem(null);
                setSelectedFile(null);
                setNewImageTitle("");
            } else {
                throw new Error("Failed to save gallery item");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to save image.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        try {
            await fetch(`/api/gallery/${id}`, { method: "DELETE" });
            setImages(images.filter(img => img._id !== id));
        } catch (error) {
            alert("Failed to delete image");
        }
    };

    const toggleVisibility = async (item: GalleryItem) => {
        // Optimistic update
        const updatedImages = images.map(img =>
            img._id === item._id ? { ...img, showInGallery: !img.showInGallery } : img
        );
        setImages(updatedImages);

        try {
            await fetch(`/api/gallery/${item._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ showInGallery: !item.showInGallery }),
            });
        } catch (error) {
            // Revert on failure
            fetchImages();
            alert("Failed to update visibility");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Gallery Manager</h1>
                <button
                    onClick={openUploadModal}
                    className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
                >
                    <Plus className="w-4 h-4" />
                    <span>Upload Image</span>
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {images.map((img) => (
                        <div key={img._id} className="group relative bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <div className="aspect-square bg-slate-100 relative">
                                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-3">
                                <h3 className="font-semibold text-slate-900 truncate">{img.title}</h3>
                                <div className="flex items-center justify-between mt-1 mb-2">
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                        {img.category}
                                    </span>
                                    {/* Visibility Indicator */}
                                    <button onClick={() => toggleVisibility(img)}>
                                        {img.showInGallery ? (
                                            <Eye className="w-4 h-4 text-green-500 hover:text-green-600 cursor-pointer" />
                                        ) : (
                                            <EyeOff className="w-4 h-4 text-slate-400 hover:text-slate-500 cursor-pointer" />
                                        )}
                                    </button>
                                </div>
                                {/* Action Buttons - Always Visible */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={async () => {
                                            try {
                                                const fullUrl = window.location.origin + img.url;
                                                await navigator.clipboard.writeText(fullUrl);
                                                alert("✅ Copied: " + fullUrl);
                                            } catch (err) {
                                                prompt("Copy this URL:", window.location.origin + img.url);
                                            }
                                        }}
                                        className="p-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded transition"
                                        title="Copy Link"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => openEditModal(img)}
                                        className="flex-1 px-2 py-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 rounded transition flex items-center justify-center gap-1"
                                        title="Edit"
                                    >
                                        <Pencil className="w-3 h-3" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(img._id)}
                                        className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded transition"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">{editingItem ? 'Edit Image' : 'Upload Image'}</h2>
                            <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* File Drop Area */}
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {selectedFile ? (
                                    <div className="text-sm text-green-600 font-medium flex items-center justify-center gap-2">
                                        <Check className="w-4 h-4" />
                                        {selectedFile.name}
                                    </div>
                                ) : (
                                    <div className="text-slate-500">
                                        <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                        <p className="text-xs mt-1">PNG, JPG, up to 10MB</p>
                                        {editingItem && <p className="text-xs text-blue-500 mt-2 font-medium">(Leave empty to keep existing image)</p>}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Image Title</label>
                                <input
                                    type="text"
                                    value={newImageTitle}
                                    onChange={(e) => setNewImageTitle(e.target.value)}
                                    className="w-full p-2 border border-slate-300 rounded-lg"
                                    placeholder="Office Exterior"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                <select
                                    value={newImageCategory}
                                    onChange={(e) => setNewImageCategory(e.target.value)}
                                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                                >
                                    <option value="General">General</option>
                                    <option value="Logo">Logo</option>
                                    <option value="Office">Office</option>
                                    <option value="Team">Team</option>
                                    <option value="Events">Events</option>
                                </select>
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={(!editingItem && !selectedFile) || !newImageTitle || uploading}
                                className="w-full bg-[var(--secondary)] text-white py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {uploading ? "Saving..." : (editingItem ? "Update Image" : "Save Image")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
