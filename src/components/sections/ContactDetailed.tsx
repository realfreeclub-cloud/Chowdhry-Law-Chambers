import AppointmentForm from "@/components/AppointmentForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface ContactDetailedProps {
    data?: any;
    config?: any;
}

export default function ContactDetailed({ data, config }: ContactDetailedProps) {
    const contact = config?.contact || { email: "", phone: "", address: "" };

    // Default values if data is missing
    const heroTitle = data?.heroTitle || "Contact Our Experts";
    const heroSubtitle = data?.heroSubtitle || "With over 40 years of legal excellence, Chowdhry Law Chambers provides strategic counsel across Delhi and nationwide. Connect with us to discuss your legal requirements.";
    const sectionSubtitle = data?.sectionSubtitle || "Connect With Us";
    const sectionTitle = data?.sectionTitle || "Professional Legal Support At Your Disposal";
    const sectionDescription = data?.sectionDescription || "Our firm operates through multiple strategic locations across Delhi to ensure accessibility and prompt legal action. Whether you require a consultation at our principal office or need assistance at the District Courts, we are ready to serve.";

    const locations = data?.locations || [
        { name: "Principal Office", address: "Bengali Market, New Delhi - 110001" },
        { name: "South Delhi Chambers", address: "Chambers No. 222, Western Wing, Saket District Court, New Delhi" },
        { name: "Central Delhi Chambers", address: "Tis Hazari District Court, Delhi - 110054" },
        { name: "Regional Branch", address: "Badarpur, New Delhi - 110044" }
    ];

    const faqs = data?.faqs || [
        {
            question: "How soon can I expect a response?",
            answer: "We typically review all inquiries and respond within 24 hours on business days to schedule an initial discussion."
        },
        {
            question: "Do you provide pan-India services?",
            answer: "Yes, while we are primarily based in Delhi, our firm represents clients in various High Courts and specialized tribunals across India."
        },
        {
            question: "Is my information confidential?",
            answer: "Absolutely. Attorney-client privilege applies from your very first communication with us, ensuring your information is completely protected."
        },
        {
            question: "What documents should I prepare?",
            answer: "For our initial call, just a brief summary is enough. If we schedule a meeting, we will provide a list of relevant legal documents needed for your specific case."
        }
    ];

    return (
        <main className="bg-slate-50">
            {/* Header */}
            <section className="bg-[var(--primary)] py-24 text-white text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold font-[var(--font-heading)] mb-6 tracking-tight">{heroTitle}</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        {heroSubtitle}
                    </p>
                </div>
            </section>

            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Contact Info & Locations */}
                    <div className="lg:col-span-7 space-y-16">
                        <div>
                            <div className="inline-block px-4 py-1.5 bg-[var(--secondary)]/10 text-[var(--secondary)] font-bold text-xs uppercase tracking-widest rounded-full mb-6">
                                {sectionSubtitle}
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-[var(--font-heading)] leading-tight">{sectionTitle}</h2>
                            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl">
                                {sectionDescription}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 transition-hover duration-300 hover:shadow-md">
                                    <div className="bg-[var(--secondary)]/10 text-[var(--secondary)] p-3 rounded-lg w-fit mb-4">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">Direct Phone</h3>
                                    <p className="text-slate-600">{contact.phone || "+91 98111 25450"}</p>
                                    <p className="text-xs text-slate-400 mt-2">Available Mon–Sun: 9am – 8pm</p>
                                </div>

                                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 transition-hover duration-300 hover:shadow-md">
                                    <div className="bg-blue-50 text-blue-600 p-3 rounded-lg w-fit mb-4">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-2">Official Email</h3>
                                    <p className="text-slate-600">{contact.email || "office@chowdhrylaw.com"}</p>
                                    <p className="text-xs text-slate-400 mt-2">Expect a response within 24 hours</p>
                                </div>
                            </div>
                        </div>

                        {/* Multiple Locations */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Our Primary Offices</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {locations.map((loc: any, idx: number) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1"><MapPin className="w-5 h-5 text-[var(--secondary)]" /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{loc.name}</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                                                {loc.address}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {contact.mapUrl && (
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white h-96 group">
                                <iframe
                                    src={contact.mapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    className="grayscale hover:grayscale-0 transition-all duration-700"
                                ></iframe>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-8">
                            <AppointmentForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {faqs.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 font-[var(--font-heading)] text-center">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {faqs.map((faq: any, idx: number) => (
                                <div key={idx} className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h4 className="text-lg font-bold text-slate-900">{faq.question}</h4>
                                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
