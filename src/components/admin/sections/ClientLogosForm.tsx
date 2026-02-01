"use client";

interface ClientLogosFormProps {
    content: any;
    onChange: (newContent: any) => void;
}

export default function ClientLogosForm({ content, onChange }: ClientLogosFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-800 mb-4">
                Note: Client logos are managed in the "Clients" section of the admin panel.
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
                        placeholder="What Our Clients Say"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle</label>
                    <input
                        type="text"
                        value={content.subtitle || ""}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Testimonials"
                    />
                </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-800">
                <strong>Tip:</strong> Only active client logos will be displayed in the scrolling marquee.
                Manage your client logos in the Clients section.
            </div>
        </div>
    );
}
