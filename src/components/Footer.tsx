import { SiteConfig } from "@/models";
import connectDB from "@/lib/db";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default async function Footer() {
    await connectDB();
    const dbConfig = await SiteConfig.findOne().lean();

    // Create a fallback that satisfies the shape we need, casting to any to avoid Mongoose internal property requirements
    const config = (dbConfig || {
        name: "Law Firm",
        contact: { email: "info@lawfirm.com", phone: "(555) 123-4567", address: "123 Main St, NY" },
        socialMedia: {},
        theme: {
            primaryColor: '#0f172a',
            secondaryColor: '#ea580c',
            buttonColor: '#ea580c',
            textColor: '#334155',
            backgroundColor: '#ffffff',
            headingFont: 'Inter',
            bodyFont: 'Inter',
        },
        disclaimer: {
            enabled: true,
            title: 'Legal Disclaimer',
            text: 'Disclaimer text...',
            acceptBtnText: 'I Agree'
        }
    }) as any;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#111] text-white border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        {config.footer?.showLogo && config.logoUrl ? (
                            <img
                                src={config.logoUrl}
                                alt={config.name}
                                style={{ height: config.footer?.logoHeight || "3rem" }}
                                className="w-auto object-contain mb-4"
                            />
                        ) : (
                            <h3 className="text-xl font-bold mb-4">{config.name}</h3>
                        )}
                        <p className="text-slate-300 text-sm mb-4">
                            {config.footer?.description || "Providing exceptional legal services with integrity, dedication, and expertise."}
                        </p>
                        {(config.footer?.showSocialMedia !== false) && config.socialMedia && (
                            <div className="flex gap-3">
                                {config.socialMedia.facebook && (
                                    <a href={config.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                )}
                                {config.socialMedia.twitter && (
                                    <a href={config.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                                {config.socialMedia.linkedin && (
                                    <a href={config.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {config.socialMedia.instagram && (
                                    <a href={config.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/practice-areas" className="text-slate-300 hover:text-white transition-colors">Practice Areas</Link></li>
                            <li><Link href="/team" className="text-slate-300 hover:text-white transition-colors">Our Team</Link></li>
                            <li><Link href="/careers" className="text-slate-300 hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/book-appointment" className="text-slate-300 hover:text-white transition-colors">Book Appointment</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-slate-400 flex-shrink-0" />
                                <span className="text-slate-300">{config.contact.address}</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                                <a href={`tel:${config.contact.phone}`} className="text-slate-300 hover:text-white transition-colors">
                                    {config.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" />
                                <a href={`mailto:${config.contact.email}`} className="text-slate-300 hover:text-white transition-colors">
                                    {config.contact.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Google Map Removed */}

                {/* Copyright */}
                <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
                    <p>&copy; {currentYear} {config.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
