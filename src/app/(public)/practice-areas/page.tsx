import { PracticeArea } from "@/models";
import connectDB from "@/lib/db";
import Link from "next/link";
import { ArrowRight, Gavel, Scale, Briefcase, Shield, Landmark, BookOpen } from "lucide-react";
import * as Icons from "lucide-react";

// Helper to resolve icon string to component
const getIcon = (name: string) => {
    // @ts-ignore
    const Icon = Icons[name];
    return Icon ? <Icon className="w-8 h-8 md:w-12 md:h-12 text-[var(--secondary)] mb-4" /> : <Gavel className="w-8 h-8 md:w-12 md:h-12 text-[var(--secondary)] mb-4" />;
};

export const dynamic = "force-dynamic";

export default async function PracticeAreasPage() {
    await connectDB();
    const areas = await PracticeArea.find().sort({ order: 1 }).lean();

    return (
        <main>
            {/* Header */}
            <section className="bg-[var(--primary)] py-20 text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold font-[var(--font-heading)] mb-4">Practice Areas</h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    The Chambers offers comprehensive representation in:
                </p>
            </section>

            {/* Grid */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {areas.map((area: any) => (
                        <Link
                            href={`/practice-areas/${area.slug}`}
                            key={area._id}
                            className="group bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 block"
                        >
                            {area.icon && getIcon(area.icon)}
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[var(--secondary)] transition-colors">
                                {area.title}
                            </h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {area.shortDescription}
                            </p>
                            <span className="inline-flex items-center text-[var(--secondary)] font-bold group-hover:gap-2 transition-all">
                                Learn More <ArrowRight className="w-4 h-4 ml-2" />
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Clients & Work Profile */}
                <div className="mt-20 border-t pt-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 font-[var(--font-heading)] text-center">Clients & Work Profile</h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto text-center">
                        The firm represents a diverse clientele including individuals, families, societies, MSMEs, startups, established corporates, pharmaceutical companies, and government bodies/PSUs. In addition to domestic matters, the Chambers advises and represents NRIs and international clients in India-related disputes.
                    </p>
                </div>
            </section>
        </main>
    );
}
