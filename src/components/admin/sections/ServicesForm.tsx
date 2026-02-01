"use client";

interface ServicesFormProps {
    content: any;
    onChange: (newContent: any) => void;
}

export default function ServicesForm({ content, onChange }: ServicesFormProps) {
    const handleChange = (field: string, value: string | number) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-800 mb-4">
                Note: The actual service items are managed in the "Practice Areas" section of the admin panel.
                Here you can customize the section title and subtitle.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Title</label>
                    <input
                        type="text"
                        value={content.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Our Practice Areas"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle</label>
                    <input
                        type="text"
                        value={content.subtitle || ""}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Comprehensive legal solutions..."
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Max items to show</label>
                    <input
                        type="number"
                        value={content.limit || 8}
                        onChange={(e) => handleChange("limit", parseInt(e.target.value) || 0)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="8"
                    />
                </div>
            </div>
        </div>
    );
}
