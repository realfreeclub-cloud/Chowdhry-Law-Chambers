"use client";

interface MapFormProps {
    content: any;
    onChange: (newContent: any) => void;
}

export default function MapForm({ content, onChange }: MapFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-800 mb-4">
                Configure the map section that displays your office location with an embedded Google Map.
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Label</label>
                    <input
                        type="text"
                        value={content.label || ""}
                        onChange={(e) => handleChange("label", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Visit Us"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Title</label>
                    <input
                        type="text"
                        value={content.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Our Location"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                    <textarea
                        value={content.description || ""}
                        onChange={(e) => handleChange("description", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm h-20"
                        placeholder="We are conveniently located in the heart of the city..."
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Google Maps Embed URL</label>
                    <textarea
                        value={content.mapUrl || ""}
                        onChange={(e) => handleChange("mapUrl", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm font-mono h-24"
                        placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                    <p className="text-xs text-slate-500 mt-1">
                        Get this from Google Maps → Share → Embed a map → Copy HTML (paste the full iframe code or just the URL)
                    </p>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Button Text</label>
                    <input
                        type="text"
                        value={content.buttonText || ""}
                        onChange={(e) => handleChange("buttonText", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Get Directions"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Button Link</label>
                    <input
                        type="text"
                        value={content.buttonLink || ""}
                        onChange={(e) => handleChange("buttonLink", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="/contact"
                    />
                </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-xs text-green-800">
                <strong>How to get Google Maps embed URL:</strong>
                <ol className="list-decimal ml-4 mt-2 space-y-1">
                    <li>Go to Google Maps and search for your location</li>
                    <li>Click "Share" button</li>
                    <li>Select "Embed a map" tab</li>
                    <li>Copy the iframe code or just the src URL</li>
                </ol>
            </div>
        </div>
    );
}
