"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export default function Testimonials({ data }: { data: any }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = data?.items || [];
    const title = data?.title || "What Our Clients Say";
    const subtitle = data?.subtitle || "Testimonials";

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    if (!items.length) return null;

    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--secondary)]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--secondary)]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[var(--secondary)] font-bold tracking-[0.2em] text-xs uppercase block mb-4">
                        {subtitle}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-[var(--secondary)] mx-auto"></div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Slide Content */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-2xl text-center relative min-h-[300px] flex flex-col items-center justify-center transition-all duration-500">
                            <Quote className="w-12 h-12 text-[var(--secondary)] opacity-50 mb-6 mx-auto" />

                            <p className="text-lg md:text-2xl font-serif italic text-gray-300 mb-8 leading-relaxed">
                                "{items[currentIndex].text}"
                            </p>

                            <div className="flex gap-1 mb-4 justify-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-[var(--secondary)] fill-current" />
                                ))}
                            </div>

                            <div>
                                <h4 className="font-bold text-xl text-white">{items[currentIndex].author}</h4>
                                <p className="text-gray-400 text-sm">{items[currentIndex].role}</p>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[var(--secondary)] hover:border-[var(--secondary)] transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[var(--secondary)] hover:border-[var(--secondary)] transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-6">
                            {items.map((_: any, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-[var(--secondary)] w-6" : "bg-gray-600 hover:bg-gray-500"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
