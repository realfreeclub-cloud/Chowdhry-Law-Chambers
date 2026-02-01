"use client";

import { useEffect, useState } from "react";
import { Gavel } from "lucide-react";

interface DisclaimerProps {
    config: {
        enabled: boolean;
        title: string;
        text: string;
        acceptBtnText: string;
    };
}

export default function DisclaimerPopup({ config }: DisclaimerProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Only show if enabled in config AND not accepted locally
        const accepted = localStorage.getItem("disclaimer_accepted");
        if (config?.enabled && !accepted) {
            setIsOpen(true);
        }
    }, [config]);

    const handleAccept = () => {
        localStorage.setItem("disclaimer_accepted", "true");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl p-8 border-t-8 border-[var(--primary)] animate-in fade-in zoom-in duration-300">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-slate-100 p-3 rounded-full mb-4">
                        <Gavel className="w-8 h-8 text-[var(--primary)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 font-[var(--font-heading)]">
                        {config.title}
                    </h2>
                    <div className="prose prose-sm text-slate-600 mb-8 max-h-60 overflow-y-auto w-full bg-slate-50 p-4 rounded text-left">
                        <p>{config.text}</p>
                    </div>
                    <button
                        onClick={handleAccept}
                        className="w-full bg-[var(--primary)] text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
                    >
                        {config.acceptBtnText}
                    </button>
                </div>
            </div>
        </div>
    );
}
