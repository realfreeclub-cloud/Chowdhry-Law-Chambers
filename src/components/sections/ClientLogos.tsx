"use client";

import { useEffect, useState } from "react";

interface Client {
    _id: string;
    name: string;
    logoUrl: string;
}

interface ClientLogosProps {
    title?: string;
    subtitle?: string;
}

export default function ClientLogos({ title = "What Our Clients Say", subtitle = "Testimonials" }: ClientLogosProps) {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        fetch("/api/clients")
            .then(res => res.json())
            .then(data => {
                const active = Array.isArray(data) ? data.filter((c: any) => c.isActive !== false) : [];
                setClients(active);
            })
            .catch(err => console.error(err));
    }, []);

    if (clients.length === 0) return null;

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-12 text-center">
                <p className="text-xs font-bold text-[var(--secondary)] uppercase tracking-[0.2em] mb-4">{subtitle}</p>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">{title}</h2>
                <div className="w-24 h-1 bg-[var(--secondary)] mx-auto rounded-full"></div>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 bg-gradient-to-r from-white to-transparent w-24 h-full z-10"></div>
                <div className="absolute top-0 right-0 bg-gradient-to-l from-white to-transparent w-24 h-full z-10"></div>

                {/* Marquee Track */}
                <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
                    {/* Original Set */}
                    {clients.map((client) => (
                        <div key={client._id} className="relative w-32 h-16 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300 grayscale hover:grayscale-0 flex-shrink-0">
                            <img
                                src={client.logoUrl}
                                alt={client.name || "Client Logo"}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}

                    {/* Duplicate Set for Loop */}
                    {clients.map((client) => (
                        <div key={`${client._id}-duplicate`} className="relative w-32 h-16 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300 grayscale hover:grayscale-0 flex-shrink-0">
                            <img
                                src={client.logoUrl}
                                alt={client.name || "Client Logo"}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    width: max-content;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
