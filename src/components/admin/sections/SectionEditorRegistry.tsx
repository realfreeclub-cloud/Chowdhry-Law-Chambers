"use client";

import AboutForm from "./AboutForm";
import ServicesForm from "./ServicesForm";
import TestimonialsForm from "./TestimonialsForm";
import BlogForm from "./BlogForm";
import ClientLogosForm from "./ClientLogosForm";
import MapForm from "./MapForm";

interface SectionEditorRegistryProps {
    type: string;
    content: any;
    onChange: (newContent: any) => void;
}

export default function SectionEditorRegistry({ type, content, onChange }: SectionEditorRegistryProps) {
    switch (type) {
        case "ABOUT":
            return <AboutForm content={content} onChange={onChange} />;
        case "SERVICES_GRID":
            return <ServicesForm content={content} onChange={onChange} />;
        case "TESTIMONIALS":
            return <TestimonialsForm content={content} onChange={onChange} />;
        case "BLOG":
            return <BlogForm content={content} onChange={onChange} />;
        case "CLIENT_LOGOS":
            return <ClientLogosForm content={content} onChange={onChange} />;
        case "MAP":
            return <MapForm content={content} onChange={onChange} />;
        case "STATS":
            return <div className="text-sm text-gray-500 italic p-2">Stats are currently static or auto-calculated.</div>;
        case "HERO_SLIDER":
            return <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">Content managed via "Sliders" tab in Admin.</div>;
        case "HERO":
            // Simple fallback for older HERO type if used
            return (
                <div className="space-y-2">
                    <label className="block text-xs text-slate-500">JSON Data</label>
                    <textarea
                        className="w-full text-xs font-mono border p-2 rounded h-20"
                        value={JSON.stringify(content, null, 2)}
                        readOnly
                    />
                    <p className="text-xs text-amber-600">Please switch to Hero Slider or update via Seed.</p>
                </div>
            );
        default:
            return (
                <div className="space-y-2">
                    <label className="block text-xs text-slate-500">Raw JSON Content</label>
                    <textarea
                        className="w-full text-xs font-mono border p-2 rounded h-24"
                        value={JSON.stringify(content, null, 2)}
                        onChange={(e) => {
                            try {
                                onChange(JSON.parse(e.target.value));
                            } catch { }
                        }}
                    />
                </div>
            );
    }
}
