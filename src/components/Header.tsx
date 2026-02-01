import Link from "next/link";
import { getSiteConfig } from "@/lib/config";
import { Phone, Search, Plus, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

export default async function Header() {
    const config = await getSiteConfig();
    const contact = config?.contact || { phone: "", email: "", address: "" };

    return (
        <header className="w-full">
            {/* Top Bar */}
            {(config?.header?.showTopBar !== false) && (
                <div className="bg-[#1a1a1a] text-[#a0a0a0] py-2 px-4 text-xs md:text-sm border-b border-gray-800">
                    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3 text-[var(--secondary)]" />
                                <span>{config?.header?.workingHours || "Mon – Sun: 9.00 am – 8.00pm"}</span>
                            </div>
                            {contact.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="w-3 h-3 text-[var(--secondary)]" />
                                    <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                                        {contact.email}
                                    </a>
                                </div>
                            )}
                            {contact.address && (
                                <div className="hidden md:flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-[var(--secondary)]" />
                                    <span>{contact.address}</span>
                                </div>
                            )}
                        </div>

                        {/* Socials */}
                        {(config?.header?.showSocialMedia !== false) && config?.socialMedia && (
                            <div className="flex items-center gap-3">
                                {config.socialMedia.facebook && (
                                    <a href={config.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        <Facebook className="w-3 h-3" />
                                    </a>
                                )}
                                {config.socialMedia.twitter && (
                                    <a href={config.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        <Twitter className="w-3 h-3" />
                                    </a>
                                )}
                                {config.socialMedia.linkedin && (
                                    <a href={config.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        <Linkedin className="w-3 h-3" />
                                    </a>
                                )}
                                {config.socialMedia.instagram && (
                                    <a href={config.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                        <Instagram className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Main Header */}
            <div className="bg-[#111111] text-white py-4 sticky top-0 z-50 shadow-lg">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {config?.logoUrl ? (
                            <img
                                src={config.logoUrl}
                                alt={config?.name || "Home"}
                                style={{ height: config?.header?.logoHeight || "3rem" }}
                                className="w-auto object-contain"
                            />
                        ) : (
                            <span className="text-2xl font-serif font-bold text-white tracking-wide">
                                {config?.name || "Law Firm"}
                            </span>
                        )}
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {(config?.menu && config.menu.length > 0 ? config.menu : [
                            { label: 'Home', href: '/' },
                            { label: 'Practice Areas', href: '/practice-areas' },
                            { label: 'Team', href: '/team' },
                            { label: 'Careers', href: '/careers' },
                            { label: 'Contact', href: '/contact' }
                        ]).map((item: any) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium uppercase tracking-wide text-gray-300 hover:text-[var(--secondary)] transition-colors flex items-center gap-1 group"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-6">
                        {contact.phone && (
                            <div className="hidden xl:flex items-center gap-2 text-white font-bold">
                                <Phone className="w-4 h-4 text-white" />
                                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                            </div>
                        )}

                        <button className="hidden lg:block text-white hover:text-[var(--secondary)] transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        <Link
                            href="/contact"
                            className="hidden lg:flex bg-[#c5a47e] text-white pl-4 pr-6 py-3 items-center gap-3 font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all group"
                        >
                            <span className="bg-white text-black p-1 group-hover:bg-black group-hover:text-white transition-colors">
                                <Plus className="w-3 h-3" />
                            </span>
                            Contact Us
                        </Link>

                        <MobileMenu config={config} />
                    </div>
                </div>
            </div>
        </header>
    );
}
