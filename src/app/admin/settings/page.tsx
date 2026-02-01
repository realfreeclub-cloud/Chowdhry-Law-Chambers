"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Building2, MapPin, Phone, Mail, Globe, Facebook, Twitter, Linkedin, Instagram, Trash2, Plus, Image as ImageIcon, X, Palette, Layout, Menu } from "lucide-react";

export default function FirmSettings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("general");

    const [config, setConfig] = useState({
        name: "",
        contact: {
            email: "",
            phone: "",
            address: "",
            mapUrl: "",
            showMapOnHome: false,
        },
        socialMedia: {
            facebook: "",
            twitter: "",
            linkedin: "",
            instagram: "",
        },
        theme: {
            mode: 'light',
            preset: 'corporate',
            primaryColor: '#0f172a',
            secondaryColor: '#d4af37',
            borderRadius: '0.5rem',
            headingFont: 'Inter',
            bodyFont: 'Inter',
        },
        logoUrl: "",
        header: { workingHours: "", showTopBar: true, showSocialMedia: true, logoHeight: "3rem" },
        footer: { description: "", showSocialMedia: true, showLogo: true, logoHeight: "3rem" },
        menu: [] as { label: string, href: string, order: number }[],
        clientsSection: { title: "", subtitle: "" },
    });

    // Gallery Selector State
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImages, setGalleryImages] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/config")
            .then(res => res.json())
            .then(data => {
                setConfig({
                    name: data.name || "",
                    contact: data.contact || { email: "", phone: "", address: "", mapUrl: "", showMapOnHome: false },
                    socialMedia: data.socialMedia || { facebook: "", twitter: "", linkedin: "", instagram: "" },
                    theme: data.theme || {
                        mode: 'light',
                        preset: 'corporate',
                        primaryColor: '#0f172a',
                        secondaryColor: '#d4af37',
                        borderRadius: '0.5rem',
                        headingFont: 'Inter',
                        bodyFont: 'Inter',
                    },
                    header: data.header || { workingHours: "Mon – Sun: 9.00 am – 8.00pm", showTopBar: true, showSocialMedia: true, logoHeight: "3rem" },
                    footer: data.footer || { description: "Providing exceptional legal services with integrity, dedication, and expertise.", showSocialMedia: true, showLogo: true, logoHeight: "3rem" },
                    logoUrl: data.logoUrl || "",
                    menu: data.menu || [],
                    clientsSection: data.clientsSection || { title: "What Our Clients Say", subtitle: "Testimonials" },
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));

        fetch("/api/gallery").then(res => res.json()).then(data => {
            if (Array.isArray(data)) setGalleryImages(data);
        });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/config", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            if (res.ok) alert("Settings saved successfully!");
            else alert("Failed to save settings");
        } catch {
            alert("Error saving settings");
        } finally {
            setSaving(false);
        }
    };

    const handleThemePreset = (preset: string) => {
        let newTheme = { ...config.theme, preset };
        if (preset === 'corporate') {
            newTheme = { ...newTheme, primaryColor: '#0f172a', secondaryColor: '#d4af37', borderRadius: '0.25rem' };
        } else if (preset === 'classic') {
            newTheme = { ...newTheme, primaryColor: '#1e293b', secondaryColor: '#c2410c', borderRadius: '0.5rem' };
        } else {
            // Default
            newTheme = { ...newTheme, primaryColor: '#3b82f6', secondaryColor: '#10b981', borderRadius: '1rem' };
        }
        setConfig({ ...config, theme: newTheme });
    };

    if (loading) return <div className="p-8">Loading...</div>;

    const tabs = [
        { id: "general", label: "General", icon: Building2 },
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "contact", label: "Contact & Social", icon: Phone },
        { id: "menu", label: "Navigation", icon: Menu },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    <span>Save Changes</span>
                </button>
            </div>

            <div className="flex gap-6">
                {/* Sidebar Config Header */}
                <div className="w-64 flex-shrink-0 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === tab.id
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="flex-1 space-y-6">

                    {/* General Tab */}
                    {activeTab === "general" && (
                        <>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Firm Info</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Firm Name</label>
                                        <input
                                            type="text"
                                            value={config.name}
                                            onChange={e => setConfig({ ...config, name: e.target.value })}
                                            className="w-full p-3 border border-slate-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Company Logo</label>
                                        <div className="flex items-center gap-4">
                                            {config.logoUrl && (
                                                <div className="bg-slate-100 p-2 rounded border border-slate-200">
                                                    <img src={config.logoUrl} alt="Logo Preview" className="h-12 object-contain" />
                                                </div>
                                            )}
                                            <button onClick={() => setIsGalleryOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700">
                                                <ImageIcon className="w-4 h-4" /> Select
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Header & Footer</h2>
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-700">Top Bar</h3>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                            <input type="checkbox" checked={config.header?.showTopBar} onChange={e => setConfig({ ...config, header: { ...config.header, showTopBar: e.target.checked } })} className="rounded border-slate-300 text-slate-900" />
                                            Show Top Bar
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                            <input type="checkbox" checked={config.header?.showSocialMedia} onChange={e => setConfig({ ...config, header: { ...config.header, showSocialMedia: e.target.checked } })} className="rounded border-slate-300 text-slate-900" />
                                            Show Socials
                                        </label>
                                    </div>
                                    <input
                                        type="text"
                                        value={config.header?.workingHours}
                                        onChange={e => setConfig({ ...config, header: { ...config.header, workingHours: e.target.value } })}
                                        className="w-full p-3 border border-slate-300 rounded-lg"
                                        placeholder="Working Hours Text"
                                    />

                                    <div className="h-px bg-slate-100 my-4" />

                                    <h3 className="font-semibold text-slate-700">Footer</h3>
                                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer mb-2">
                                        <input type="checkbox" checked={config.footer?.showSocialMedia} onChange={e => setConfig({ ...config, footer: { ...config.footer, showSocialMedia: e.target.checked } })} className="rounded border-slate-300 text-slate-900" />
                                        Show Socials
                                    </label>
                                    <textarea
                                        value={config.footer?.description}
                                        onChange={e => setConfig({ ...config, footer: { ...config.footer, description: e.target.value } })}
                                        className="w-full p-3 border border-slate-300 rounded-lg h-24"
                                        placeholder="Footer description text"
                                    />

                                    <div className="h-px bg-slate-100 my-4" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Header Logo Height (px)</label>
                                            <input
                                                type="text"
                                                value={config.header?.logoHeight?.replace('px', '') || ''}
                                                onChange={e => {
                                                    const val = e.target.value;
                                                    // Allow users to type number, we assume px
                                                    // If they type 3rem, we keep it? User asked for px.
                                                    // Simpler: Just bind to px.
                                                    setConfig({
                                                        ...config,
                                                        header: { ...config.header, logoHeight: val ? `${val}px` : "" }
                                                    });
                                                }}
                                                className="w-full p-3 border border-slate-300 rounded-lg"
                                                placeholder="e.g. 50"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">Enter height in pixels (e.g. 50)</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Footer Logo Height (px)</label>
                                            <input
                                                type="text"
                                                value={config.footer?.logoHeight?.replace('px', '') || ''}
                                                onChange={e => {
                                                    const val = e.target.value;
                                                    setConfig({
                                                        ...config,
                                                        footer: { ...config.footer, logoHeight: val ? `${val}px` : "" }
                                                    });
                                                }}
                                                className="w-full p-3 border border-slate-300 rounded-lg"
                                                placeholder="e.g. 50"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">Enter height in pixels (e.g. 50)</p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={config.footer?.showLogo}
                                                onChange={e => setConfig({ ...config, footer: { ...config.footer, showLogo: e.target.checked } })}
                                                className="rounded border-slate-300 text-slate-900"
                                            />
                                            Show Logo in Footer
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === "appearance" && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Theme Settings</h2>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <button
                                    onClick={() => handleThemePreset('corporate')}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${config.theme.preset === 'corporate' ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'}`}
                                >
                                    <div className="font-bold text-slate-900">Corporate</div>
                                    <div className="text-xs text-slate-500 mt-1">Navy & Gold, Sharp</div>
                                </button>
                                <button
                                    onClick={() => handleThemePreset('classic')}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${config.theme.preset === 'classic' ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'}`}
                                >
                                    <div className="font-bold text-slate-900">Classic</div>
                                    <div className="text-xs text-slate-500 mt-1">Dark Blue & Rust</div>
                                </button>
                                <button
                                    onClick={() => handleThemePreset('default')}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${config.theme.preset === 'default' ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300'}`}
                                >
                                    <div className="font-bold text-slate-900">Modern</div>
                                    <div className="text-xs text-slate-500 mt-1">Blue & Emerald, Round</div>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Primary Color</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={config.theme.primaryColor}
                                            onChange={e => setConfig({ ...config, theme: { ...config.theme, primaryColor: e.target.value } })}
                                            className="h-10 w-20 rounded border border-slate-300 p-1"
                                        />
                                        <input
                                            type="text"
                                            value={config.theme.primaryColor}
                                            onChange={e => setConfig({ ...config, theme: { ...config.theme, primaryColor: e.target.value } })}
                                            className="flex-1 p-2 border border-slate-300 rounded-lg uppercase"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Secondary Color (Accent)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={config.theme.secondaryColor}
                                            onChange={e => setConfig({ ...config, theme: { ...config.theme, secondaryColor: e.target.value } })}
                                            className="h-10 w-20 rounded border border-slate-300 p-1"
                                        />
                                        <input
                                            type="text"
                                            value={config.theme.secondaryColor}
                                            onChange={e => setConfig({ ...config, theme: { ...config.theme, secondaryColor: e.target.value } })}
                                            className="flex-1 p-2 border border-slate-300 rounded-lg uppercase"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Border Radius</label>
                                    <select
                                        value={config.theme.borderRadius}
                                        onChange={e => setConfig({ ...config, theme: { ...config.theme, borderRadius: e.target.value } })}
                                        className="w-full p-2 border border-slate-300 rounded-lg"
                                    >
                                        <option value="0rem">Sharp (0px)</option>
                                        <option value="0.25rem">Small (4px)</option>
                                        <option value="0.5rem">Medium (8px)</option>
                                        <option value="1rem">Large (16px)</option>
                                        <option value="2rem">Round (32px)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Font Family</label>
                                    <select
                                        value={config.theme.headingFont}
                                        onChange={e => setConfig({ ...config, theme: { ...config.theme, headingFont: e.target.value, bodyFont: e.target.value } })}
                                        className="w-full p-2 border border-slate-300 rounded-lg"
                                    >
                                        <option value="Inter">Inter (Sans-Serif)</option>
                                        <option value="Playfair Display">Playfair Display (Serif)</option>
                                        <option value="Roboto">Roboto</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contact Tab */}
                    {activeTab === "contact" && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Contact Info</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="email" value={config.contact.email} onChange={e => setConfig({ ...config, contact: { ...config.contact, email: e.target.value } })} placeholder="Email" className="p-3 border rounded-lg" />
                                    <input type="tel" value={config.contact.phone} onChange={e => setConfig({ ...config, contact: { ...config.contact, phone: e.target.value } })} placeholder="Phone" className="p-3 border rounded-lg" />
                                    <input type="text" value={config.contact.address} onChange={e => setConfig({ ...config, contact: { ...config.contact, address: e.target.value } })} placeholder="Address" className="p-3 border rounded-lg md:col-span-2" />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Social Media</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="url" value={config.socialMedia.facebook} onChange={e => setConfig({ ...config, socialMedia: { ...config.socialMedia, facebook: e.target.value } })} placeholder="Facebook URL" className="p-3 border rounded-lg" />
                                    <input type="url" value={config.socialMedia.twitter} onChange={e => setConfig({ ...config, socialMedia: { ...config.socialMedia, twitter: e.target.value } })} placeholder="Twitter URL" className="p-3 border rounded-lg" />
                                    <input type="url" value={config.socialMedia.linkedin} onChange={e => setConfig({ ...config, socialMedia: { ...config.socialMedia, linkedin: e.target.value } })} placeholder="LinkedIn URL" className="p-3 border rounded-lg" />
                                    <input type="url" value={config.socialMedia.instagram} onChange={e => setConfig({ ...config, socialMedia: { ...config.socialMedia, instagram: e.target.value } })} placeholder="Instagram URL" className="p-3 border rounded-lg" />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Maps</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="showMap"
                                            checked={config.contact.showMapOnHome}
                                            onChange={e => setConfig({ ...config, contact: { ...config.contact, showMapOnHome: e.target.checked } })}
                                            className="w-4 h-4 rounded border-slate-300 text-slate-900"
                                        />
                                        <label htmlFor="showMap" className="text-sm font-medium text-slate-700">Show Map on Homepage</label>
                                    </div>
                                    <input
                                        type="url"
                                        value={config.contact.mapUrl}
                                        onChange={e => {
                                            let val = e.target.value;
                                            // Auto-extract src if user pastes full iframe code
                                            if (val.includes("<iframe")) {
                                                const match = val.match(/src=["']([^"']+)["']/);
                                                if (match && match[1]) {
                                                    val = match[1];
                                                }
                                            }
                                            setConfig({ ...config, contact: { ...config.contact, mapUrl: val } });
                                        }}
                                        className="w-full p-3 border border-slate-300 rounded-lg"
                                        placeholder="Paste the full iframe code or just the URL"
                                    />
                                    <p className="text-xs text-slate-500">You can paste the full Google Maps <code>&lt;iframe&gt;</code> code here, and we'll extract the link for you.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Menu Tab */}
                    {activeTab === "menu" && (
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Navigation Menu</h2>
                            <div className="space-y-2">
                                {config.menu.map((item, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input value={item.label} onChange={e => {
                                            const newMenu = [...config.menu];
                                            newMenu[idx].label = e.target.value;
                                            setConfig({ ...config, menu: newMenu });
                                        }} className="flex-1 p-2 border rounded" placeholder="Label" />
                                        <input value={item.href} onChange={e => {
                                            const newMenu = [...config.menu];
                                            newMenu[idx].href = e.target.value;
                                            setConfig({ ...config, menu: newMenu });
                                        }} className="flex-1 p-2 border rounded" placeholder="URL" />
                                        <button onClick={() => {
                                            const newMenu = config.menu.filter((_, i) => i !== idx);
                                            setConfig({ ...config, menu: newMenu });
                                        }} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                ))}
                                <button onClick={() => setConfig({ ...config, menu: [...config.menu, { label: "", href: "", order: config.menu.length }] })} className="text-sm text-blue-600 font-medium flex items-center gap-1 mt-2">
                                    <Plus className="w-4 h-4" /> Add Link
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Gallery Picker (Same as before) */}
            {isGalleryOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col m-4">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Select Image</h2>
                            <button onClick={() => setIsGalleryOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {galleryImages.map((img) => (
                                    <button
                                        key={img._id}
                                        onClick={() => {
                                            setConfig({ ...config, logoUrl: img.url });
                                            setIsGalleryOpen(false);
                                        }}
                                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition group"
                                    >
                                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
