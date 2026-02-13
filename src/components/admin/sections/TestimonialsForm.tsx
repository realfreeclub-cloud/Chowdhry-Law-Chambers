"use client";

import { Trash2, Plus } from "lucide-react";

interface TestimonialsFormProps {
    content: any;
    onChange: (newContent: any) => void;
}

export default function TestimonialsForm({ content, onChange }: TestimonialsFormProps) {
    const items = content.items || [];

    const handleChange = (field: string, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const handleItemChange = (index: number, field: string, value: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange({ ...content, items: newItems });
    };

    const addItem = () => {
        onChange({
            ...content,
            items: [...items, { text: "", author: "", role: "Client" }]
        });
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_: any, i: number) => i !== index);
        onChange({ ...content, items: newItems });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Section Title</label>
                    <input
                        type="text"
                        value={content.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="What Our Clients Say"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Section Subtitle</label>
                    <input
                        type="text"
                        value={content.subtitle || ""}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Testimonials"
                    />
                </div>
            </div>

            <label className="block text-xs font-bold text-slate-700 uppercase">Client Reviews</label>

            {items.map((item: any, idx: number) => (
                <div key={idx} className="border border-slate-200 p-3 rounded-lg bg-slate-50 relative group">
                    <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-3 pr-8">
                        <div>
                            <label className="block text-[10px] font-medium text-slate-500 mb-1">Review Text</label>
                            <textarea
                                value={item.text || ""}
                                onChange={(e) => handleItemChange(idx, "text", e.target.value)}
                                className="w-full p-2 border border-slate-300 rounded text-sm h-16"
                                placeholder="Testimonial content..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-[10px] font-medium text-slate-500 mb-1">Author Name</label>
                                <input
                                    type="text"
                                    value={item.author || ""}
                                    onChange={(e) => handleItemChange(idx, "author", e.target.value)}
                                    className="w-full p-2 border border-slate-300 rounded text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-slate-500 mb-1">Role / Company</label>
                                <input
                                    type="text"
                                    value={item.role || ""}
                                    onChange={(e) => handleItemChange(idx, "role", e.target.value)}
                                    className="w-full p-2 border border-slate-300 rounded text-sm"
                                    placeholder="Client"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addItem}
                className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-slate-400 hover:text-slate-600 text-sm flex items-center justify-center gap-2"
            >
                <Plus className="w-4 h-4" /> Add Testimonial
            </button>
        </div>
    );
}
