import AppointmentForm from "@/components/AppointmentForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { getSiteConfig } from "@/lib/config";

export default async function ContactPage() {
    const config = await getSiteConfig();
    const contact = config?.contact || { email: "", phone: "", address: "" };

    return (
        <main className="bg-slate-50">
            {/* Header */}
            <section className="bg-[var(--primary)] py-24 text-white text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold font-[var(--font-heading)] mb-6 tracking-tight">Contact Our Experts</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        With over 40 years of legal excellence, Chowdhry Law Chambers provides strategic counsel across Delhi and nationwide. Connect with us to discuss your legal requirements.
                    </p>
                </div>
            </section>

            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Contact Info & Locations */}
                    <div className="lg:col-span-7 space-y-16">
                        <div>
                            <div className="inline-block px-4 py-1.5 bg-[var(--secondary)]/10 text-[var(--secondary)] font-bold text-xs uppercase tracking-widest rounded-full mb-6">
                                Connect With Us
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-[var(--font-heading)] leading-tight">Professional Legal Support <br />At Your Disposal</h2>
                            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl">
                                Our firm operates through multiple strategic locations across Delhi to ensure accessibility and prompt legal action. Whether you require a consultation at our principal office or need assistance at the District Courts, we are ready to serve.
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
                                <div className="flex items-start gap-4">
                                    <div className="mt-1"><MapPin className="w-5 h-5 text-[var(--secondary)]" /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Principal Office</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Bengali Market, New Delhi - 110001
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1"><MapPin className="w-5 h-5 text-[var(--secondary)]" /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">South Delhi Chambers</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Chambers No. 222, Western Wing, <br />Saket District Court, New Delhi
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1"><MapPin className="w-5 h-5 text-[var(--secondary)]" /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Central Delhi Chambers</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Tis Hazari District Court, <br />Delhi - 110054
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-1"><MapPin className="w-5 h-5 text-[var(--secondary)]" /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Regional Branch</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Badarpur, New Delhi - 110044
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {config?.contact?.mapUrl && (
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white h-96 group">
                                <iframe
                                    src={config.contact.mapUrl}
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
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-12 sticky top-8">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-slate-900 mb-4 font-[var(--font-heading)]">Request a Consultation</h2>
                                <p className="text-slate-500 leading-relaxed">Please provide your details and a brief summary of your legal matter. A senior member of our team will contact you shortly.</p>
                            </div>
                            <AppointmentForm />

                            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                                <p className="text-sm text-slate-400 italic">
                                    "Excellence in Jurisprudence since 1986"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ / Trust Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 font-[var(--font-heading)]">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-slate-900">How soon can I expect a response?</h4>
                            <p className="text-slate-600 leading-relaxed">We typically review all inquiries and respond within 24 hours on business days to schedule an initial discussion.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-slate-900">Do you provide pan-India services?</h4>
                            <p className="text-slate-600 leading-relaxed">Yes, while we are primarily based in Delhi, our firm represents clients in various High Courts and specialized tribunals across India.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-slate-900">Is my information confidential?</h4>
                            <p className="text-slate-600 leading-relaxed">Absolutely. Attorney-client privilege applies from your very first communication with us, ensuring your information is completely protected.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-slate-900">What documents should I prepare?</h4>
                            <p className="text-slate-600 leading-relaxed">For our initial call, just a brief summary is enough. If we schedule a meeting, we will provide a list of relevant legal documents needed for your specific case.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
