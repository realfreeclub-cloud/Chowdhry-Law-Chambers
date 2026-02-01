import Link from "next/link";

interface HeroProps {
    data: {
        title: string;
        subtitle: string;
        ctaText: string;
        ctaLink: string;
        imageUrl?: string;
    };
}

export default function Hero({ data }: HeroProps) {
    return (
        <section className="relative h-[600px] flex items-center justify-center text-white">
            {/* Background Image */}
            {data.imageUrl && (
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${data.imageUrl})` }}
                >
                    <div className="absolute inset-0 bg-[#0f172a]/70" />
                </div>
            )}

            <div className="relative z-10 container mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[var(--font-primary)]">
                    {data.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
                    {data.subtitle}
                </p>
                <Link
                    href={data.ctaLink || '/contact'}
                    className="inline-block bg-[var(--secondary)] hover:opacity-90 text-white font-bold py-4 px-8 rounded-lg transition-all"
                >
                    {data.ctaText}
                </Link>
            </div>
        </section>
    );
}
