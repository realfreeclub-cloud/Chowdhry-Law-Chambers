"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, ArrowDown } from "lucide-react";

interface ISlider {
    _id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    link?: string;
    buttonText?: string;
    description?: string;
    titleFontSize?: string;
    subtitleFontSize?: string;
    descFontSize?: string;
}

export default function HeroSlider() {
    const [sliders, setSliders] = useState<ISlider[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        fetch("/api/sliders")
            .then(res => res.json())
            .then(data => {
                const active = data.filter((s: any) => s.isActive);
                setSliders(active);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (sliders.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % sliders.length);
        }, 6000); // Slower interval for readability
        return () => clearInterval(interval);
    }, [sliders]);

    const next = () => setCurrent(prev => (prev + 1) % sliders.length);
    const prev = () => setCurrent(prev => (prev - 1 + sliders.length) % sliders.length);

    if (sliders.length === 0) return null;

    return (
        <section className="relative h-[85vh] w-full overflow-hidden bg-[#111] text-white">
            {sliders.map((slide, index) => (
                <div
                    key={slide._id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <div
                            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${index === current ? "scale-110" : "scale-100"
                                }`}
                            style={{ backgroundImage: `url(${slide.imageUrl})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-20 h-full container mx-auto px-4 flex items-center">
                        <div className="w-full grid grid-cols-12 gap-8">

                            {/* Left Badge Removed as per request */}
                            <div className="hidden lg:flex col-span-2 flex-col justify-center items-center">
                                {/* Badge removed to fix overlap error */}
                            </div>

                            {/* Main Text Content */}
                            <div className="col-span-12 lg:col-span-8 flex flex-col justify-center pl-0 lg:pl-12">
                                <div className={`space-y-6 transition-all duration-1000 delay-300 ${index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}>
                                    <span
                                        style={{ fontSize: slide.subtitleFontSize || '0.875rem' }}
                                        className="inline-block px-3 py-1 bg-[var(--secondary)]/20 text-[var(--secondary)] font-bold tracking-widest uppercase border-l-2 border-[var(--secondary)]">
                                        {slide.subtitle || "Premium Legal Services"}
                                    </span>

                                    <h1
                                        style={{ fontSize: slide.titleFontSize || '5rem' }}
                                        className="font-bold leading-tight">
                                        <span className="block font-serif italic text-white/90">{slide.title.split(' ')[0]}</span>
                                        <span className="block text-white">
                                            {slide.title.split(' ').slice(1).join(' ')}
                                        </span>
                                    </h1>

                                    <p
                                        style={{ fontSize: slide.descFontSize || '1.125rem' }}
                                        className="text-gray-300 max-w-xl border-l border-white/20 pl-6 my-8">
                                        {slide.description || "Experienced attorneys are just a call away, ready to provide guidance on personal, business, and criminal matters."}
                                    </p>

                                    {slide.link && (
                                        <Link
                                            href={slide.link}
                                            className="group inline-flex items-center gap-4 bg-white text-black pl-2 pr-8 py-2 rounded-full font-bold hover:bg-[var(--secondary)] hover:text-white transition-all w-fit"
                                        >
                                            <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[var(--secondary)] transition-colors">
                                                <Plus className="w-5 h-5" />
                                            </span>
                                            {slide.buttonText || "Learn More"}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            {sliders.length > 1 && (
                <div className="absolute bottom-12 right-12 z-30 flex gap-4">
                    <button
                        onClick={prev}
                        className="w-12 h-12 border border-white/20 hover:bg-[var(--secondary)] hover:border-[var(--secondary)] rounded-full flex items-center justify-center text-white transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={next}
                        className="w-12 h-12 border border-white/20 hover:bg-[var(--secondary)] hover:border-[var(--secondary)] rounded-full flex items-center justify-center text-white transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Custom Styles for stroke text */}
            <style jsx global>{`
                .outline-text {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
                }
            `}</style>
        </section>
    );
}
