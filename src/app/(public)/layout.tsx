import { getSiteConfig } from "@/lib/config";
import DisclaimerPopup from "@/components/DisclaimerPopup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const config = await getSiteConfig();

    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            {config?.disclaimer && <DisclaimerPopup config={config.disclaimer} />}
        </>
    );
}
