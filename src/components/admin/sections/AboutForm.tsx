"use client";

import { useState, useEffect } from "react";

interface AboutFormProps {
    content: any;
    onChange: (newContent: any) => void;
}

export default function AboutForm({ content, onChange }: AboutFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle</label>
                    <input
                        type="text"
                        value={content.subtitle || ""}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="ABOUT US"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={content.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="We’re Advocates..."
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                <textarea
                    value={content.description || ""}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded text-sm h-24"
                    placeholder="Main text content..."
                />
            </div>

            {/* Media Configuration */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-500">Media Settings</h4>

                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Media Type</label>
                    <select
                        value={content.mediaType || "image"}
                        onChange={(e) => handleChange("mediaType", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm bg-white"
                    >
                        <option value="image">Image Only</option>
                        <option value="video">Video</option>
                    </select>
                </div>

                {content.mediaType === "video" && (
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Video URL (YouTube/Vimeo)</label>
                        <input
                            type="text"
                            value={content.videoUrl || ""}
                            onChange={(e) => handleChange("videoUrl", e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm font-mono"
                            placeholder="https://www.youtube.com/watch?v=..."
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Main Image / Thumbnail URL</label>
                    <input
                        type="text"
                        value={content.mainImage || ""}
                        onChange={(e) => handleChange("mainImage", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm font-mono"
                        placeholder="https://..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Group Image URL (Right)</label>
                    <input
                        type="text"
                        value={content.groupImage || ""}
                        onChange={(e) => handleChange("groupImage", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm font-mono"
                        placeholder="https://..."
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Quote Text</label>
                <textarea
                    value={content.quote || ""}
                    onChange={(e) => handleChange("quote", e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded text-sm h-16"
                    placeholder="The good lawyer..."
                />
            </div>

            {/* Contact Card Configuration */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-500">Contact Card</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number (Display)</label>
                        <input
                            type="text"
                            value={content.phone || ""}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm"
                            placeholder="+(528) 456-7592"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Custom Link (Optional)</label>
                        <input
                            type="text"
                            value={content.callLink || ""}
                            onChange={(e) => handleChange("callLink", e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm font-mono"
                            placeholder="/contact or https://..."
                        />
                        <p className="text-[10px] text-slate-500 mt-1">Leave empty to dial the phone number.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
