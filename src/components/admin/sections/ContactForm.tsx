"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface ContactFormProps {
    content: any;
    onChange: (newContent: any) => void;
}

export default function ContactForm({ content, onChange }: ContactFormProps) {
    const handleChange = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const addLocation = () => {
        const locations = content.locations || [];
        handleChange("locations", [...locations, { name: "", address: "" }]);
    };

    const removeLocation = (index: number) => {
        const locations = [...(content.locations || [])];
        locations.splice(index, 1);
        handleChange("locations", locations);
    };

    const updateLocation = (index: number, field: string, value: string) => {
        const locations = [...(content.locations || [])];
        locations[index] = { ...locations[index], [field]: value };
        handleChange("locations", locations);
    };

    const addFAQ = () => {
        const faqs = content.faqs || [];
        handleChange("faqs", [...faqs, { question: "", answer: "" }]);
    };

    const removeFAQ = (index: number) => {
        const faqs = [...(content.faqs || [])];
        faqs.splice(index, 1);
        handleChange("faqs", faqs);
    };

    const updateFAQ = (index: number, field: string, value: string) => {
        const faqs = [...(content.faqs || [])];
        faqs[index] = { ...faqs[index], [field]: value };
        handleChange("faqs", faqs);
    };

    return (
        <div className="space-y-8">
            {/* Hero Section Info */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Hero Banner</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Hero Title</label>
                        <input
                            type="text"
                            value={content.heroTitle || ""}
                            onChange={(e) => handleChange("heroTitle", e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm"
                            placeholder="Contact Our Experts"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Hero Subtitle</label>
                        <input
                            type="text"
                            value={content.heroSubtitle || ""}
                            onChange={(e) => handleChange("heroSubtitle", e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm"
                            placeholder="Strategic counsel across Delhi..."
                        />
                    </div>
                </div>
            </div>

            {/* Main Section Content */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Main Content</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Section Subtitle (Badge)</label>
                        <input
                            type="text"
                            value={content.sectionSubtitle || ""}
                            onChange={(e) => handleChange("sectionSubtitle", e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm"
                            placeholder="Connect With Us"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Section Title</label>
                        <input
                            type="text"
                            value={content.sectionTitle || ""}
                            onChange={(e) => handleChange("sectionTitle", e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded text-sm"
                            placeholder="Professional Legal Support..."
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Description</label>
                    <textarea
                        value={content.sectionDescription || ""}
                        onChange={(e) => handleChange("sectionDescription", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm h-24"
                        placeholder="Our firm operates through multiple strategic locations..."
                    />
                </div>
            </div>

            {/* Locations */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Office Locations</h4>
                    <button
                        onClick={addLocation}
                        className="flex items-center gap-1 text-[10px] font-bold bg-slate-900 text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
                    >
                        <Plus className="w-3 h-3" /> ADD LOCATION
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(content.locations || []).map((loc: any, idx: number) => (
                        <div key={idx} className="p-3 border border-slate-200 rounded-lg relative bg-white group shadow-sm">
                            <button
                                onClick={() => removeLocation(idx)}
                                className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-1">OFFICE NAME</label>
                                    <input
                                        type="text"
                                        value={loc.name || ""}
                                        onChange={(e) => updateLocation(idx, "name", e.target.value)}
                                        className="w-full p-1.5 border border-slate-200 rounded text-xs"
                                        placeholder="Principal Office"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-1">ADDRESS</label>
                                    <textarea
                                        value={loc.address || ""}
                                        onChange={(e) => updateLocation(idx, "address", e.target.value)}
                                        className="w-full p-1.5 border border-slate-200 rounded text-xs h-16"
                                        placeholder="Bengali Market, New Delhi..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {(content.locations || []).length === 0 && (
                        <div className="col-span-2 py-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                            <p className="text-xs text-slate-400">No locations added yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Frequently Asked Questions</h4>
                    <button
                        onClick={addFAQ}
                        className="flex items-center gap-1 text-[10px] font-bold bg-slate-900 text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
                    >
                        <Plus className="w-3 h-3" /> ADD FAQ
                    </button>
                </div>

                <div className="space-y-4">
                    {(content.faqs || []).map((faq: any, idx: number) => (
                        <div key={idx} className="p-4 border border-slate-200 rounded-xl relative bg-white shadow-sm">
                            <button
                                onClick={() => removeFAQ(idx)}
                                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-5">
                                    <label className="block text-[10px] font-bold text-slate-400 mb-1">QUESTION</label>
                                    <input
                                        type="text"
                                        value={faq.question || ""}
                                        onChange={(e) => updateFAQ(idx, "question", e.target.value)}
                                        className="w-full p-2 border border-slate-200 rounded text-sm font-medium"
                                        placeholder="How soon can I expect a response?"
                                    />
                                </div>
                                <div className="md:col-span-7">
                                    <label className="block text-[10px] font-bold text-slate-400 mb-1">ANSWER</label>
                                    <textarea
                                        value={faq.answer || ""}
                                        onChange={(e) => updateFAQ(idx, "answer", e.target.value)}
                                        className="w-full p-2 border border-slate-200 rounded text-sm h-20"
                                        placeholder="We typically review all inquiries..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {(content.faqs || []).length === 0 && (
                        <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                            <p className="text-xs text-slate-400">No FAQs added yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
