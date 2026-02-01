"use client";

import { useEffect, useState } from "react";
import { FileText, Briefcase, Users, Calendar, BriefcaseIcon, UserCheck, Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AdminStatsSkeleton, Skeleton } from "@/components/admin/ui/Skeletons";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        pages: 0,
        practiceAreas: 0,
        team: 0,
        jobs: 0,
        appointments: 0,
        applications: 0,
        articles: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/stats", { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                if (!data.error) setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="space-y-8">
            <Skeleton className="w-48 h-10" />
            <AdminStatsSkeleton />
        </div>
    );

    const mainStats = [
        { label: "Appointments", value: stats.appointments, icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50", link: "/admin/appointments" },
        { label: "Job Applications", value: stats.applications, icon: UserCheck, color: "text-blue-600", bg: "bg-blue-50", link: "/admin/applications" },
    ];

    const contentStats = [
        { label: "Articles", value: stats.articles, icon: Newspaper, link: "/admin/blog" },
        { label: "Pages", value: stats.pages, icon: FileText, link: "/admin/pages" },
        { label: "Practice Areas", value: stats.practiceAreas, icon: Briefcase, link: "/admin/practice-areas" },
        { label: "Team Members", value: stats.team, icon: Users, link: "/admin/team" },
        { label: "Active Jobs", value: stats.jobs, icon: BriefcaseIcon, link: "/admin/jobs" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Operational overview and content summary.</p>
                </div>
                <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Primary Stats - Operations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mainStats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Link href={stat.link} key={idx} className="group block">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[var(--secondary)] hover:shadow-md transition-all h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`${stat.bg} p-3 rounded-xl`}>
                                        <Icon className={`w-8 h-8 ${stat.color}`} />
                                    </div>
                                    <div className="flex items-center text-slate-400 group-hover:text-[var(--secondary)] transition-colors">
                                        <span className="text-xs font-bold uppercase tracking-wider mr-2">Manage</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                                <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wide mb-1">{stat.label}</h3>
                                <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Secondary Stats - Content */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Content Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {contentStats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <Link href={stat.link} key={idx} className="group block">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow transition-all">
                                    <div className="flex items-center justify-between mb-3">
                                        <Icon className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                        <span className="text-xl font-bold text-slate-900">{stat.value}</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{stat.label}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Quick Actions (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/admin/blog/editor/new" className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2 transition-colors">
                            <Newspaper className="w-4 h-4" /> Write Article
                        </Link>
                        <Link href="/admin/pages" className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2 transition-colors">
                            <FileText className="w-4 h-4" /> New Page
                        </Link>
                        <Link href="/admin/appointments" className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 flex items-center gap-2 transition-colors">
                            <Calendar className="w-4 h-4" /> View Schedule
                        </Link>
                    </div>
                </div>
                <div className="bg-[var(--secondary)] rounded-xl shadow-sm p-6 text-white relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-2">Need Support?</h3>
                        <p className="text-white/80 text-sm mb-4">Contact the technical team for assistance with the Admin Panel.</p>
                        <button className="px-4 py-2 bg-white text-[var(--secondary)] rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
                            Get Help
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl transform -translate-x-5 translate-y-5"></div>
                </div>
            </div>
        </div>
    );
}
