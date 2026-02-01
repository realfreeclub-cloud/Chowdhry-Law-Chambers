import { MapPin } from "lucide-react";

export default function MapSection({ mapUrl }: { mapUrl: string }) {
    if (!mapUrl) return null;

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
                            <span>Visit Us</span>
                        </div>
                        <h2 className="text-3xl font-serif text-slate-900 mb-6">Our Location</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            We are conveniently located in the heart of the city.
                            Visit our offices for a consultation or contact us to schedule an appointment.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-slate-900 text-white px-8 py-3 rounded text-sm font-bold tracking-wider uppercase hover:bg-[var(--secondary)] transition-colors w-fit"
                        >
                            Get Directions
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
