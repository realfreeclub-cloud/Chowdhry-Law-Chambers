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
        {
            name: "Principal Office",
            address: "20, Todarmal Rd, Bengali Market,\nNew Delhi - 110001",
            phone: "+91 98111 25450",
            icon: <MapPin className="w-6 h-6" />
        },
        {
            name: "Saket Court Office",
            address: "Chambers No. 222, Western Wing,\nSaket District Court, New Delhi",
            phone: "+91 98111 25450",
            icon: <MapPin className="w-6 h-6" />
        },
        {
            name: "Tis Hazari Office",
            address: "Chambers No. 445, Western Wing,\nTis Hazari District Court, Delhi",
            phone: "+91 98111 25450",
            icon: <MapPin className="w-6 h-6" />
        }
    ];

    const mapUrl = data?.mapUrl || config?.contact?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.031119690018!2d77.2329824!3d28.628829399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd2c4152b10d%3A0xa4881b34e1c4749d!2s20%2C%20Todarmal%20Rd%2C%20Bengali%20Market%2C%20Todermal%20Road%20Area%2C%20Mandi%20House%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1771009745181!5m2!1sen!2sin";
    const directionsLink = data?.directionsLink || "https://maps.app.goo.gl/YourMapID";

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
        <main className="bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="bg-[var(--primary)] py-28 text-white text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-full mb-8">
                        Legal Excellence Worldwide
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-[var(--font-heading)] mb-8 tracking-tight">
                        {heroTitle}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        {heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Offices Section */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 bg-[var(--secondary)]/10 text-[var(--secondary)] font-bold text-xs uppercase tracking-widest rounded-full mb-6">
                            {sectionSubtitle}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-[var(--font-heading)]">Our Three Strategic Offices</h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Providing accessibility across New Delhi's key legal districts. Reach us at any of our primary locations for professional legal counsel.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {locations.map((loc: any, idx: number) => (
                            <div key={idx} className="group p-8 bg-slate-50 rounded-3xl border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <MapPin className="w-24 h-24 -mr-8 -mt-8" />
                                </div>
                                <div className="bg-[var(--secondary)]/10 text-[var(--secondary)] p-4 rounded-2xl w-fit mb-8 group-hover:bg-[var(--secondary)] group-hover:text-white transition-colors duration-500">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-[var(--font-heading)]">{loc.name}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed whitespace-pre-line text-lg">
                                    {loc.address}
                                </p>
                                <div className="pt-6 border-t border-slate-200 mt-auto">
                                    <div className="flex items-center gap-3 text-slate-500">
                                        <Phone className="w-4 h-4 text-[var(--secondary)]" />
                                        <span className="font-medium">{loc.phone}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Map & More Info */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-slate-900 font-[var(--font-heading)] leading-tight">Locate Us On Map</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Our principal office is situated in the heart of Bengali Market, offering easy access to the Supreme Court of India and various high-level legal institutions.
                            </p>
                        </div>

                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white h-[500px] relative group bg-white shadow-slate-200">
                            <iframe
                                src={mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
                            ></iframe>
                            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-slate-900">Principal Office</h4>
                                    <p className="text-sm text-slate-600">20, Todarmal Rd, Bengali Market</p>
                                </div>
                                <a href={directionsLink} target="_blank" className="bg-[var(--secondary)] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[var(--secondary)]/20 hover:scale-105 transition-transform">
                                    Get Directions
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                            <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
                                <Mail className="w-8 h-8 text-blue-600 mb-4" />
                                <h4 className="font-bold text-slate-900 text-xl mb-2">Email Correspondence</h4>
                                <p className="text-slate-600 mb-1">{contact.email || "office@chowdhrylaw.com"}</p>
                                <p className="text-xs text-blue-600/70 font-bold uppercase tracking-wider">Fast Response Guaranteed</p>
                            </div>
                            <div className="p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100">
                                <Clock className="w-8 h-8 text-emerald-600 mb-4" />
                                <h4 className="font-bold text-slate-900 text-xl mb-2">Office Hours</h4>
                                <p className="text-slate-600">Mon–Sun: 9:00 AM – 8:00 PM</p>
                                <p className="text-xs text-emerald-600/70 font-bold uppercase tracking-wider">Always Operational</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-8 bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
                            <div className="p-8 pb-0">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Schedule a Consultation</h3>
                                <p className="text-slate-500 mb-0">Fill out the form below and our legal team will contact you shortly.</p>
                            </div>
                            <AppointmentForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {faqs.length > 0 && (
                <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--secondary)] rounded-full blur-[120px]"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[var(--font-heading)]">Common Inquiries</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Everything you need to know about initiating your legal journey with us.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {faqs.map((faq: any, idx: number) => (
                                <div key={idx} className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <h4 className="text-xl font-bold text-white mb-4 flex items-start gap-3">
                                        <span className="text-[var(--secondary)] font-serif text-2xl leading-none">Q.</span>
                                        {faq.question}
                                    </h4>
                                    <p className="text-slate-300 leading-relaxed text-lg pl-8">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
