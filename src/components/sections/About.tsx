import { Play, Phone } from "lucide-react";

export default function About({ data }: { data: any }) {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column: Lawyer Image */}
                    <div className="w-full lg:w-5/12 relative">
                        <div className="relative rounded-[3rem] rounded-tl-none overflow-hidden shadow-2xl h-[600px] w-full bg-gray-100">
                            {/* Main Lawyer Image */}
                            {data.mainImage && (
                                <img
                                    src={data.mainImage}
                                    alt="Senior Lawyer"
                                    className="object-cover w-full h-full"
                                />
                            )}

                            {/* Play Button Overlay */}
                            {(data.mediaType === 'video' || data.videoUrl) && (
                                <a
                                    href={data.videoUrl || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 flex items-center justify-center group"
                                >
                                    <div className="w-20 h-20 bg-[#c5a47e]/80 backdrop-blur-sm rounded-[2rem] flex items-center justify-center cursor-pointer group-hover:bg-[#c5a47e] transition-colors shadow-lg">
                                        <Play className="w-8 h-8 text-white fill-current group-hover:scale-110 transition-transform ml-1" />
                                    </div>
                                </a>
                            )}
                        </div>

                        {/* Quote Block Below */}
                        <div className="mt-8 flex gap-4">
                            <span className="text-6xl text-[#c5a47e] font-serif leading-none opacity-50">“</span>
                            <p className="text-gray-500 italic text-lg leading-relaxed pt-2">
                                {data.quote || "The good lawyer is not the man who has an eye to every side and angle of contingency, and qualifies all his qualifications, but who throws himself on your part so heartily, that he can get you out of a scrape."}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="w-full lg:w-7/12 flex flex-col justify-center relative">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-8 h-[2px] bg-[#c5a47e]"></span>
                                <span className="text-[#c5a47e] font-bold tracking-widest text-xs uppercase">
                                    {data.subtitle || "ABOUT US"}
                                </span>
                                <span className="w-8 h-[2px] bg-[#c5a47e]"></span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif font-medium text-[#111] leading-tight mb-6">
                                {data.title || "We’re Advocates for Justice and Right"}
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {data.description || "We are dedicated advocates for justice and your legal rights. Our mission is to provide strong representation for individuals and businesses facing legal challenges."}
                            </p>
                        </div>

                        {/* Group Image & Floating Card */}
                        <div className="relative mt-4">
                            <div className="rounded-xl overflow-hidden h-[350px] w-full bg-gray-100">
                                {data.groupImage && (
                                    <img
                                        src={data.groupImage}
                                        alt="Our Team"
                                        className="object-cover w-full h-full"
                                    />
                                )}
                            </div>

                            {/* Floating Contact Card */}
                            <div className="absolute -bottom-12 left-8 md:left-12 max-w-sm w-full">
                                <div className="bg-white p-8 md:p-10 rounded-[2rem] rounded-bl-none shadow-2xl border-t-4 border-[#c5a47e]">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-4 h-[2px] bg-[#c5a47e]"></span>
                                            <span className="text-[#c5a47e] font-bold tracking-wider text-[10px] uppercase">ASK A LAWYER</span>
                                            <span className="w-4 h-[2px] bg-[#c5a47e]"></span>
                                        </div>
                                        <h3 className="text-2xl font-serif text-[#111] mb-6">
                                            We Provide Solid Law Practice
                                        </h3>

                                        <a
                                            href={data.callLink || `tel:${data.phone?.replace(/[^0-9+]/g, '')}`}
                                            className="flex items-stretch w-full rounded-lg overflow-hidden transition-transform hover:scale-105"
                                        >
                                            <div className="bg-[#0f172a] text-white px-4 py-3 flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase flex-1">
                                                <Phone className="w-3 h-3" /> Call Us
                                            </div>
                                            <div className="bg-[#c5a47e] text-white px-4 py-3 flex items-center justify-center text-sm font-bold flex-1">
                                                {data.phone || "+(528) 456-7592"}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
