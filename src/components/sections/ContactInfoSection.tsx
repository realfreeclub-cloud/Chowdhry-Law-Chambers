"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfoSection({ data, config }: { data: any, config?: any }) {
    const siteContact = config?.contact || {};

    const title = data?.title || "Get in Touch";
    const subtitle = data?.subtitle || "We are here to assist you with your legal needs.";
    const phone = data?.phone || siteContact.phone || "+91 98111 25450";
    const email = data?.email || siteContact.email || "office@chowdhrylaw.com";
    const address = data?.address || siteContact.address || "Bengali Market, New Delhi - 110001";
    const mapUrl = data?.mapUrl || siteContact.mapUrl;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">{title}</h2>
                    <p className="text-lg text-slate-600">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="bg-[var(--secondary)]/10 text-[var(--secondary)] p-4 rounded-xl">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-1">Call Us</h4>
                                <p className="text-slate-600">{phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="bg-blue-50 text-blue-600 p-4 rounded-xl">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-1">Email Us</h4>
                                <p className="text-slate-600">{email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="bg-slate-100 text-slate-600 p-4 rounded-xl">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-1">Our Office</h4>
                                <p className="text-slate-600 leading-relaxed">{address}</p>
                            </div>
                        </div>
                    </div>

                    {mapUrl ? (
                        <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                            <iframe
                                src={mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    ) : (
                        <div className="h-[400px] bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                            Map URL not configured
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
