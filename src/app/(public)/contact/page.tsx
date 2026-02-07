import AppointmentForm from "@/components/AppointmentForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { getSiteConfig } from "@/lib/config";

export default async function ContactPage() {
    const config = await getSiteConfig();
    const contact = config?.contact || { email: "", phone: "", address: "" };

    return (
        <main>
            {/* Header */}
            <section className="bg-[var(--primary)] py-20 text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold font-[var(--font-heading)] mb-4">Contact Us</h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Get in touch with Chowdhry Law Chambers. We're here to provide the legal guidance and representation you need.
                </p>
            </section>

            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 font-[var(--font-heading)]">Office Information</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Our chambers are centrally located and accessible. Whether you prefer to visit us in person or reach out digitally, we're ready to assist.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start space-x-4">
                                <div className="bg-[var(--secondary)] text-white p-3 rounded-lg">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Phone</h3>
                                    <p className="text-slate-600">{contact.phone || "Not available"}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-[var(--secondary)] text-white p-3 rounded-lg">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Email</h3>
                                    <p className="text-slate-600">{contact.email || "info@firm.com"}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-[var(--secondary)] text-white p-3 rounded-lg">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Address</h3>
                                    <p className="text-slate-600">{contact.address || "New Delhi, India"}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-[var(--secondary)] text-white p-3 rounded-lg">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Working Hours</h3>
                                    <p className="text-slate-600">{config?.header?.workingHours || "Mon – Sun: 9.00 am – 8.00pm"}</p>
                                </div>
                            </div>
                        </div>

                        {config?.contact?.mapUrl && (
                            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 h-64">
                                <iframe
                                    src={config.contact.mapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        )}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-[var(--font-heading)] text-center">Send us a Message</h2>
                        <p className="text-slate-500 text-center mb-8">Fill out the form below and we'll get back to you shortly.</p>
                        <AppointmentForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
