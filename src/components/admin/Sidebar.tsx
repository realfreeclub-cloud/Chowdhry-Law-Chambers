"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Briefcase,
    Users,
    LogOut,
    Image as ImageIcon,
    BriefcaseIcon,
    UserCheck,
    Calendar,
    Newspaper
} from "lucide-react";
import { signOut } from "next-auth/react";

const navGroups = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        ]
    },
    {
        title: "Content Management",
        items: [
            { label: "Pages", href: "/admin/pages", icon: FileText },
            { label: "Articles", href: "/admin/blog", icon: Newspaper },
            { label: "Practice Areas", href: "/admin/practice-areas", icon: Briefcase },
            { label: "Clients", href: "/admin/clients", icon: Users },
            { label: "Sliders", href: "/admin/sliders", icon: ImageIcon },
            { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
        ]
    },
    {
        title: "Operations",
        items: [
            { label: "Appointments", href: "/admin/appointments", icon: Calendar },
            { label: "Applications", href: "/admin/applications", icon: UserCheck },
        ]
    },
    {
        title: "Organization",
        items: [
            { label: "Team", href: "/admin/team", icon: Users },
            { label: "Jobs", href: "/admin/jobs", icon: BriefcaseIcon },
        ]
    },
    {
        title: "System",
        items: [
            { label: "Settings", href: "/admin/settings", icon: Settings },
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-slate-900 text-white flex flex-col h-full flex-shrink-0 border-r border-slate-800">
            {/* Logo Area */}
            <div className="p-6 border-b border-white/5 bg-slate-950/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--secondary)] to-yellow-600 flex items-center justify-center font-serif font-bold text-white text-lg shadow-lg shadow-yellow-900/20">
                        L
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-wide uppercase">Law Firm</h1>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
                {navGroups.map((group, idx) => (
                    <div key={idx}>
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">
                            {group.title}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`group flex items-center h-10 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-[var(--secondary)] text-white shadow-md shadow-yellow-900/20"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 mr-3 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 bg-slate-950/30 border-t border-white/5">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-700">
                        AD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Administrator</p>
                        <p className="text-xs text-slate-500 truncate">admin@firm.com</p>
                    </div>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center w-full px-2 py-2 text-xs font-medium text-slate-400 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-3 h-3 mr-2" />
                    Sign Out
                </button>
            </div>


        </aside>
    );
}
