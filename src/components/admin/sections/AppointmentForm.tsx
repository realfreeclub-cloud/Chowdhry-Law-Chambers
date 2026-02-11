"use client";

interface AppointmentFormProps {
    content: any;
    onChange: (newContent: any) => void;
}

export default function AppointmentForm({ content, onChange }: AppointmentFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={content.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Schedule a Consultation"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle</label>
                    <input
                        type="text"
                        value={content.subtitle || ""}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Please provide your details below"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                    value={content.description || ""}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded text-sm h-20"
                    placeholder="Brief instructions for the user..."
                />
            </div>
        </div>
    );
}
