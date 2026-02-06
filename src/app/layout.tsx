import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google"; // Updated fonts
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSiteConfig } from "@/lib/config";

// Force dynamic rendering (fix build DB connection)
export const dynamic = "force-dynamic";

// Serif Font for Headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Sans Font for Body
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: config?.name || "Law Firm",
    description: config?.name || "Premier Law Firm",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();
  const theme = config?.theme || {
    primaryColor: "#0f172a",
    secondaryColor: "#ea580c",
    buttonColor: "#ea580c",
    textColor: "#334155",
    backgroundColor: "#ffffff",
    headingFont: "Inter",
    bodyFont: "Inter",
  };

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${manrope.variable} font-sans antialiased`}
      >
        <ThemeProvider initialTheme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
