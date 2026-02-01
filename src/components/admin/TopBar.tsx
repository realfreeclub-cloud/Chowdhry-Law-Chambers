"use client";

import { Search, Bell, HelpCircle } from "lucide-react";

export default function TopBar() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search (Cmd+K)"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:ring-1 focus:ring-slate-200 focus:bg-white transition-all"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 ml-4">
                <button className="p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-colors">
                    <HelpCircle className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
