"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    primaryColor: string;
    secondaryColor: string;
    buttonColor: string;
    textColor: string;
    backgroundColor: string;
    headingFont: string;
    bodyFont: string;
}

const ThemeContext = createContext<ThemeContextType>({
    primaryColor: "#0f172a",
    secondaryColor: "#ea580c",
    buttonColor: "#ea580c",
    textColor: "#334155",
    backgroundColor: "#ffffff",
    headingFont: "Inter",
    bodyFont: "Inter",
});

export function ThemeProvider({
    children,
    initialTheme,
}: {
    children: React.ReactNode;
    initialTheme: ThemeContextType;
}) {
    const [theme] = useState(initialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--primary", theme.primaryColor);
        root.style.setProperty("--secondary", theme.secondaryColor);
        root.style.setProperty("--button-color", theme.buttonColor);
        root.style.setProperty("--text-color", theme.textColor);
        root.style.setProperty("--background-color", theme.backgroundColor);
        root.style.setProperty("--font-heading", theme.headingFont);
        root.style.setProperty("--font-body", theme.bodyFont);

        // Also map to Tailwind's font-sans and font-serif logic if we used that, 
        // but here we are using custom variables.
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
