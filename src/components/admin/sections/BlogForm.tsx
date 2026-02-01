"use client";

interface BlogFormProps {
    content: any;
    onChange: (newContent: any) => void;
}

export default function BlogForm({ content, onChange }: BlogFormProps) {
    const handleChange = (field: string, value: string | number | boolean) => {
        onChange({ ...content, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-xs text-blue-800 mb-4">
                Note: Blog posts are managed in the "Blog" section of the admin panel.
                Here you can customize how the blog section appears on this page.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Section Title</label>
                    <input
                        type="text"
                        value={content.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Latest Insights"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle</label>
                    <input
                        type="text"
                        value={content.subtitle || ""}
                        onChange={(e) => handleChange("subtitle", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="Stay informed with our legal insights..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Number of Posts to Show</label>
                    <input
                        type="number"
                        value={content.limit || 6}
                        onChange={(e) => handleChange("limit", parseInt(e.target.value) || 6)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        placeholder="6"
                        min="1"
                        max="12"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Layout Style</label>
                    <select
                        value={content.layout || "grid"}
                        onChange={(e) => handleChange("layout", e.target.value)}
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                    >
                        <option value="grid">Grid (3 columns)</option>
                        <option value="list">List (stacked)</option>
                    </select>
                </div>
            </div>

            <div className="border-t pt-4">
                <label className="block text-xs font-medium text-slate-700 mb-3">Display Options</label>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={content.showCategory !== false}
                            onChange={(e) => handleChange("showCategory", e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-slate-700">Show Category Badge</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={content.showAuthor !== false}
                            onChange={(e) => handleChange("showAuthor", e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-slate-700">Show Author Name</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={content.showReadTime !== false}
                            onChange={(e) => handleChange("showReadTime", e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-slate-700">Show Read Time</span>
                    </label>
                </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-800">
                <strong>Tip:</strong> Only published blog posts will be displayed. Manage your blog posts in the Blog section.
            </div>
        </div>
    );
}
