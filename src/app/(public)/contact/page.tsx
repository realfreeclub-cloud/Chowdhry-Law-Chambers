import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import { Page, SiteConfig } from "@/models";
import SectionRenderer from "@/components/sections/SectionRenderer";
import ContactDetailed from "@/components/sections/ContactDetailed";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function ContactPage() {
    await connectDB();

    // Attempt to fetch the contact page from database
    const page = await Page.findOne({ slug: "contact" }).lean();
    const config = await SiteConfig.findOne().lean();

    // If the page exists in DB, render its sections
    if (page && page.sections && page.sections.length > 0) {
        return (
            <main>
                {page.sections.map((section: any, idx: number) => (
                    <SectionRenderer
                        key={idx}
                        section={section}
                        config={JSON.parse(JSON.stringify(config))}
                    />
                ))}
            </main>
        );
    }

    // FALLBACK: If no page found in DB or sections are empty, 
    // show the default ContactDetailed component with hardcoded excellence.
    return (
        <main>
            <ContactDetailed
                data={null}
                config={JSON.parse(JSON.stringify(config))}
            />
        </main>
    );
}
