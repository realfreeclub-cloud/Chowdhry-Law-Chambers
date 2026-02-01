"use client";

import { useEffect, useState } from "react";

const stats = [
    { label: "Cases Won", value: 1500, suffix: "+" },
    { label: "Trusted Clients", value: 850, suffix: "+" },
    { label: "Dedicated Lawyers", value: 45, suffix: "" },
    { label: "Years Experience", value: 25, suffix: "+" },
];

export default function Stats() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="py-20 bg-[#111] border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center group">
                            <div className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 group-hover:text-[#c5a47e] transition-colors duration-300">
                                {stat.value}{stat.suffix}
                            </div>
                            <div className="w-12 h-1 bg-[#c5a47e] mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
