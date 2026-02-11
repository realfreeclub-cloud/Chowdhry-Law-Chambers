"use client";

interface ContactInfoFormProps {
    content: any;
    onChange: (newContent: any) => void;
}

export default function ContactInfoForm({ content, onChange }: ContactInfoFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Title</label>
                    <input
                        type="text"
                        value={content.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Get in Touch"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle</label>
                    <input
                        type="text"
                        value={content.subtitle || ""}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="We are here to help you"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone (Override)</label>
                    <input
                        type="text"
                        value={content.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="+91 98111 25450"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email (Override)</label>
                    <input
                        type="text"
                        value={content.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="office@chowdhrylaw.com"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Address (Override)</label>
                <textarea
                    value={content.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded text-sm h-20"
                    placeholder="Bengali Market, New Delhi..."
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Map URL (Embed Link)</label>
                <input
                    type="text"
                    value={content.mapUrl || ""}
                    onChange={(e) => handleChange("mapUrl", e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded text-sm"
                    placeholder="https://www.google.com/maps/embed?..."
                />
            </div>
        </div>
    );
}
