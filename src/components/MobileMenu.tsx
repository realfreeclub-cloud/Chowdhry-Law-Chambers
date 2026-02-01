"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

interface MobileMenuProps {
    config: any;
}

export default function MobileMenu({ config }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const contact = config?.contact || {};
    const social = config?.socialMedia || {};

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="text-white p-2 hover:text-[var(--secondary)] transition-colors"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-[#111] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header with Logo and Close */}
                    <div className="p-6 flex justify-between items-center border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            {config?.logoUrl ? (
                                <img
                                    src={config.logoUrl}
                                    alt={config?.name || "Home"}
                                    style={{ height: config?.header?.logoHeight || "3rem" }}
                                    className="w-auto object-contain"
                                />
                            ) : (
                                <span className="text-xl font-serif font-bold text-white tracking-wide">
                                    {config?.name || "Law Firm"}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 overflow-y-auto py-6 px-4">
                        <nav className="space-y-2">
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
                                    onClick={() => setIsOpen(false)}
                                    className="block py-3 px-4 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-[var(--secondary)] rounded-lg transition-colors uppercase tracking-wide"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-8 pt-8 border-t border-gray-800 space-y-4">
                            {contact.phone && (
                                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4 text-[var(--secondary)]" />
                                    <span>{contact.phone}</span>
                                </a>
                            )}
                            {contact.email && (
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 text-[var(--secondary)]" />
                                    <span>{contact.email}</span>
                                </a>
                            )}
                            {contact.address && (
                                <div className="flex items-start gap-3 text-gray-400">
                                    <MapPin className="w-4 h-4 text-[var(--secondary)] mt-1" />
                                    <span>{contact.address}</span>
                                </div>
                            )}
                        </div>

                        {/* Social Media */}
                        <div className="mt-8 flex gap-4">
                            {social.facebook && <a href={social.facebook} target="_blank" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-[var(--secondary)] transition-all"><Facebook className="w-4 h-4" /></a>}
                            {social.twitter && <a href={social.twitter} target="_blank" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-[var(--secondary)] transition-all"><Twitter className="w-4 h-4" /></a>}
                            {social.linkedin && <a href={social.linkedin} target="_blank" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-[var(--secondary)] transition-all"><Linkedin className="w-4 h-4" /></a>}
                            {social.instagram && <a href={social.instagram} target="_blank" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-[var(--secondary)] transition-all"><Instagram className="w-4 h-4" /></a>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
