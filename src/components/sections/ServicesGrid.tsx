"use client";

import { useEffect, useState } from "react";
import { LucideIcon, Scale, Shield, Users, Briefcase, ArrowRight, Gavel, FileText, Landmark, UserCheck } from "lucide-react";

// Map string names to Lucide icons
const iconMap: Record<string, any> = {
    Scale, Shield, Users, Briefcase, Gavel, FileText, Landmark, UserCheck
};

interface ServiceItem {
    title: string;
    description: string; // API uses 'description', legacy might use 'desc'
    shortDescription?: string;
    icon?: string;
    slug?: string;
}

interface ServicesGridProps {
    data: {
        title: string;
        subtitle?: string;
        limit?: number;
        items?: ServiceItem[]; // Legacy support
    };
}

export default function ServicesGrid({ data }: ServicesGridProps) {
    const [items, setItems] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch live data
        fetch("/api/practice-areas")
            .then(res => res.json())
            .then(apiData => {
                if (Array.isArray(apiData)) {
                    setItems(apiData);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch practice areas", err);
                setLoading(false);
            });
    }, []);

    // Function to get the correct icon component
    const getIcon = (iconName?: string) => {
        if (!iconName) return Scale;
        return iconMap[iconName] || Scale;
    };

    // Determine which items to show
    // If API data exists, use it. Otherwise fallback to static data.
    const displayItems = items.length > 0 ? items : (data.items || []);

    // Apply limit
    const limit = data.limit || 8;
    const finalItems = displayItems.slice(0, limit);

    return (
        <section className="py-24 bg-slate-950 text-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
                    {data.subtitle && (
                        <span className="text-[var(--secondary)] font-bold tracking-[0.2em] text-xs uppercase">
                            {data.subtitle}
                        </span>
                    )}
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                        {data.title || "Our Practice Areas"}
                    </h2>
                    <div className="w-16 h-1 bg-[var(--secondary)] mx-auto mt-6"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading && items.length === 0 && (
                        // Skeleton loading state
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="bg-slate-900 h-64 animate-pulse rounded border border-white/5"></div>
                        ))
                    )}

                    {!loading && finalItems.map((item, idx) => {
                        const Icon = getIcon(item.icon);
                        // API might return 'description' or 'shortDescription', legacy 'desc'
                        const desc = item.shortDescription || item.description || (item as any).desc || "";

                        return (
                            <div
                                key={idx}
                                className="group relative bg-slate-900 p-8 border border-white/5 hover:border-[var(--secondary)]/50 transition-all duration-300 overflow-hidden"
                            >
                                {/* Hover Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon */}
                                    <div className="mb-6 inline-flex items-center justify-center">
                                        <Icon className="w-10 h-10 text-[var(--secondary)] group-hover:scale-110 transition-transform duration-300" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-serif font-bold mb-4 text-white group-hover:text-[var(--secondary)] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                        {desc}
                                    </p>

                                    {/* Link / Read More */}
                                    <a href={`/practice-areas`} className="flex items-center text-[var(--secondary)] font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform cursor-pointer">
                                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-12 text-center">
                    <a href="/practice-areas" className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--secondary)] text-white text-sm font-bold uppercase tracking-widest rounded hover:bg-opacity-90 transition-colors group">
                        See More Practice Areas
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
