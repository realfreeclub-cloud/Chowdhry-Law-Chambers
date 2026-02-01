import { Gallery } from "@/models";
import connectDB from "@/lib/db";
import Image from "next/image";

// Revalidate every hour
export const revalidate = 3600;

export default async function GalleryPage() {
    await connectDB();
    const images = await Gallery.find({ showInGallery: true }).sort({ order: 1, createdAt: -1 });

    // Group by category if desired, but for now simple grid
    // We can add client-side filtering later if needed.

    return (
        <div className="min-h-screen bg-[#111] text-white pt-24 pb-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
                    <span className="text-[#c5a47e] font-bold tracking-[0.2em] text-xs uppercase">
                        Our Workplace & Events
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
                        Gallery
                    </h1>
                    <div className="w-16 h-1 bg-[#c5a47e] mx-auto mt-6"></div>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        A glimpse into our firm, our people, and our commitment to excellence.
                    </p>
                </div>

                {images.length === 0 ? (
                    <div className="text-center text-slate-500 py-20">
                        No images available yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((img: any) => (
                            <div key={img._id} className="group relative aspect-[4/3] bg-[#1a1a1a] overflow-hidden rounded-sm border border-white/5">
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="text-[#c5a47e] text-xs font-bold uppercase tracking-wider mb-1">
                                        {img.category}
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-white">
                                        {img.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
