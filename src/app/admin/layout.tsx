"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    if (pathname === "/admin/login") {
        return <div className="flex min-h-screen items-center justify-center bg-slate-900">{children}</div>;
    }

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col h-full min-w-0">
                <TopBar />

                <main className="flex-1 overflow-y-auto p-8 relative">
                    <div className="max-w-6xl mx-auto pb-20">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
