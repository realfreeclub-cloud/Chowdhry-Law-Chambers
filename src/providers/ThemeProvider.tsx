"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    config: any;
    updateConfig: (newConfig: any) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<any>(null);

    useEffect(() => {
        fetch("/api/config")
            .then(res => res.json())
            .then(data => {
                setConfig(data);
                applyTheme(data?.theme);
            })
            .catch(console.error);
    }, []);

    const applyTheme = (theme: any) => {
        if (!theme) return;
        const root = document.documentElement;

        // Colors
        root.style.setProperty("--primary", theme.primaryColor || "#0f172a");
        root.style.setProperty("--secondary", theme.secondaryColor || "#d4af37");
        root.style.setProperty("--bg-color", theme.backgroundColor || "#ffffff");
        root.style.setProperty("--text-color", theme.textColor || "#334155");

        // Shape & Font
        root.style.setProperty("--radius", theme.borderRadius || "0.5rem");
        root.style.setProperty("--font-heading", theme.headingFont || "Inter");
        root.style.setProperty("--font-body", theme.bodyFont || "Inter");

        // Mode (simplified for now to just class toggling if needed)
        if (theme.mode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const updateConfig = (newConfig: any) => {
        setConfig(newConfig);
        applyTheme(newConfig.theme);
    };

    return (
        <ThemeContext.Provider value={{ config, updateConfig }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
