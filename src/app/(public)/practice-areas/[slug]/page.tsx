import { PracticeArea } from "@/models";
import connectDB from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    await connectDB();
    const { slug } = await params;
    const area = await PracticeArea.findOne({ slug }).lean();

    if (!area) {
        return {
            title: "Practice Area Not Found",
        };
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    return {
        title: `${area.title} | Law Firm`,
        description: area.shortDescription,
        openGraph: {
            title: area.title,
            description: area.shortDescription,
            url: `${baseUrl}/practice-areas/${area.slug}`,
            siteName: 'Law Firm',
            images: area.imageUrl ? [
                {
                    url: area.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: area.title,
                }
            ] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: area.title,
            description: area.shortDescription,
            images: area.imageUrl ? [area.imageUrl] : [],
        },
    };
}

export default async function PracticeAreaDetail({ params }: { params: Promise<{ slug: string }> }) {
    await connectDB();
    const { slug } = await params;

    const area = await PracticeArea.findOne({ slug }).lean();

    if (!area) {
        notFound();
    }

    return (
        <main>
            {/* Hero */}
            <section className="bg-[var(--primary)] py-20 text-white px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <Link href="/practice-areas" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Practice Areas
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold font-[var(--font-heading)] mb-6">
                        {area.title}
                    </h1>
                    <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                        {area.shortDescription}
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {area.imageUrl && (
                        <div className="rounded-xl overflow-hidden mb-8 h-96 shadow-lg">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={area.imageUrl} alt={area.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none text-slate-700">
                        {/* If fullDescription is missing, fallback or empty */}
                        {area.fullDescription ? (
                            <ReactMarkdown>{area.fullDescription}</ReactMarkdown>
                        ) : (
                            <p>Detailed information coming soon.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 sticky top-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 font-[var(--font-heading)]">Why Choose Us?</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <CheckCircle2 className="w-6 h-6 text-[var(--secondary)] mr-3 flex-shrink-0" />
                                <span className="text-slate-700">Decades of specialized experience</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-6 h-6 text-[var(--secondary)] mr-3 flex-shrink-0" />
                                <span className="text-slate-700">Proven track record of success</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-6 h-6 text-[var(--secondary)] mr-3 flex-shrink-0" />
                                <span className="text-slate-700">Client-focused approach</span>
                            </li>
                        </ul>
                        <div className="mt-8 pt-8 border-t border-slate-200">
                            <Link
                                href="/contact"
                                className="block w-full text-center bg-[var(--secondary)] text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                            >
                                Request Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
