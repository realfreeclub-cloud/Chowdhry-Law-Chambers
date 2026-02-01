import { MapPin } from "lucide-react";

interface MapSectionProps {
    data?: {
        label?: string;
        title?: string;
        description?: string;
        mapUrl?: string;
        buttonText?: string;
        buttonLink?: string;
    };
}

export default function MapSectionEditable({ data }: MapSectionProps) {
    const label = data?.label || "Visit Us";
    const title = data?.title || "Our Location";
    const description = data?.description || "We are conveniently located in the heart of the city. Visit our offices for a consultation or contact us to schedule an appointment.";
    const mapUrl = data?.mapUrl || "";
    const buttonText = data?.buttonText || "Get Directions";
    const buttonLink = data?.buttonLink || "/contact";

    if (!mapUrl) {
        return (
            <section className="w-full bg-slate-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-500">Map section: Please configure the Google Maps URL in the page editor.</p>
                </div>
            </section>
        );
    }

    // Sanitize URL if it contains iframe code
    let url = mapUrl;
    if (mapUrl.includes("<iframe")) {
        const match = mapUrl.match(/src=["']([^"']+)["']/);
        if (match && match[1]) url = match[1];
    }

    return (
        <section className="w-full bg-slate-50 py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 text-[var(--secondary)] font-bold tracking-widest uppercase text-sm mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{label}</span>
                        </div>
                        <h2 className="text-3xl font-serif text-slate-900 mb-6">{title}</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            {description}
                        </p>
                        <a
                            href={buttonLink}
                            className="inline-block bg-slate-900 text-white px-8 py-3 rounded text-sm font-bold tracking-wider uppercase hover:bg-[var(--secondary)] transition-colors w-fit"
                        >
                            {buttonText}
                        </a>
                    </div>
                    <div className="w-full md:flex-1 h-[300px] md:h-[400px] bg-slate-200 relative order-first md:order-last">
                        <iframe
                            src={url}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                            title="Location Map"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
