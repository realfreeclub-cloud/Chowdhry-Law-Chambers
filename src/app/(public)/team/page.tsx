import { TeamMember } from "@/models";
import connectDB from "@/lib/db";
import { User, Linkedin, Mail, BadgeCheck } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
    await connectDB();
    const team = await TeamMember.find().sort({ order: 1 }).lean();

    return (
        <main>
            {/* Header */}
            <section className="bg-[var(--primary)] py-20 text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold font-[var(--font-heading)] mb-4">Our Team</h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Meet the dedicated professionals committed to your success. Our attorneys bring decades of combined experience and specialized knowledge to every case.
                </p>
            </section>

            {/* Grid */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {team.map((member: any) => (
                        <div key={member._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100 flex flex-col">
                            {/* Photo */}
                            <div className="h-80 w-full bg-slate-200 relative group overflow-hidden">
                                {member.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={member.imageUrl}
                                        alt={member.fullName}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                        <User className="w-20 h-20 mb-2" />
                                    </div>
                                )}
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2">
                                    <h3 className="text-2xl font-bold font-[var(--font-heading)]">{member.fullName}</h3>
                                    <p className="text-[var(--secondary)] font-medium text-sm uppercase tracking-wide">{member.role}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                {member.experience && (
                                    <p className="flex items-center text-sm font-bold text-slate-500 mb-4">
                                        <BadgeCheck className="w-4 h-4 text-[var(--secondary)] mr-2" />
                                        {member.experience} Experience
                                    </p>
                                )}

                                <div className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-4 flex-grow">
                                    {member.bio ? (
                                        <ReactMarkdown>{member.bio}</ReactMarkdown>
                                    ) : (
                                        <p>No bio available.</p>
                                    )}
                                </div>

                                {/* Social / Contact */}
                                <div className="border-t border-slate-100 pt-4 flex space-x-4">
                                    {member.email && (
                                        <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-[var(--secondary)] transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    )}
                                    {member.linkedinUrl && (
                                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
