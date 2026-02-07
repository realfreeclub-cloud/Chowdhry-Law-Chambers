import { TeamMember } from "@/models";
import connectDB from "@/lib/db";
import { User, Linkedin, Mail, BadgeCheck, ArrowLeft, Building, Scale, BookOpen } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function TeamMemberPage(props: Props) {
    const params = await props.params;
    await connectDB();

    let member;
    try {
        member = await TeamMember.findById(params.id).lean();
    } catch (error) {
        notFound();
    }

    if (!member) {
        notFound();
    }

    return (
        <main className="bg-slate-50 min-h-screen">
            {/* Header / Breadcrumb area */}
            <div className="bg-[var(--primary)] text-white py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/team"
                        className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Team
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold font-[var(--font-heading)]">{member.fullName}</h1>
                    <p className="text-[var(--secondary)] text-lg md:text-xl mt-2 font-medium tracking-wide uppercase">{member.role}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 -mt-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Image & Contact */}
                    <div className="lg:w-1/3 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden sticky top-8">
                            <div className="h-96 lg:h-[500px] w-full bg-slate-200 relative">
                                {member.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={member.imageUrl}
                                        alt={member.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                                        <User className="w-32 h-32 mb-4 opacity-50" />
                                    </div>
                                )}
                            </div>

                            <div className="p-8 space-y-6">
                                {member.experience && (
                                    <div className="flex items-center text-slate-700 font-bold border-b border-slate-100 pb-4">
                                        <div className="bg-[var(--secondary)]/10 p-2 rounded-lg mr-4">
                                            <BadgeCheck className="w-6 h-6 text-[var(--secondary)]" />
                                        </div>
                                        <div>
                                            <span className="block text-xs text-slate-500 uppercase font-semibold">Experience</span>
                                            <span className="text-lg">{member.experience}</span>
                                        </div>
                                    </div>
                                )}

                                {member.email && (
                                    <div className="flex items-center text-slate-700 border-b border-slate-100 pb-4">
                                        <div className="bg-blue-50 p-2 rounded-lg mr-4">
                                            <Mail className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className="block text-xs text-slate-500 uppercase font-semibold">Email</span>
                                            <a href={`mailto:${member.email}`} className="text-lg hover:text-[var(--secondary)] transition-colors truncate block">
                                                {member.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {member.linkedinUrl && (
                                    <div className="flex items-center text-slate-700">
                                        <div className="bg-[#0077b5]/10 p-2 rounded-lg mr-4">
                                            <Linkedin className="w-6 h-6 text-[#0077b5]" />
                                        </div>
                                        <div>
                                            <span className="block text-xs text-slate-500 uppercase font-semibold">LinkedIn</span>
                                            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-[var(--secondary)] transition-colors">
                                                View Profile
                                            </a>
                                        </div>
                                    </div>
                                )}

                                <Link href="/book-appointment" className="block w-full bg-[var(--primary)] hover:bg-slate-800 text-white text-center font-bold py-4 rounded-lg transition-all shadow-md hover:shadow-lg mt-8">
                                    Book a Consultation
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bio & content */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 md:p-12 min-h-[500px]">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                                <BookOpen className="w-6 h-6 mr-3 text-[var(--secondary)]" />
                                Professional Profile
                            </h2>

                            <div className="prose prose-lg prose-slate max-w-none 
                                prose-headings:font-[var(--font-heading)] prose-headings:text-slate-900 
                                prose-a:text-[var(--secondary)] prose-a:no-underline hover:prose-a:underline
                                prose-li:marker:text-[var(--secondary)]">
                                {member.bio ? (
                                    <ReactMarkdown>{member.bio}</ReactMarkdown>
                                ) : (
                                    <p className="text-slate-500 italic">No biography available for this team member.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
