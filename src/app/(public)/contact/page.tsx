import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import { Page, SiteConfig } from "@/models";
import SectionRenderer from "@/components/sections/SectionRenderer";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function ContactPage() {
    await connectDB();

    // Fetch the contact page from database
    const page = await Page.findOne({ slug: "contact", isPublished: true }).lean();
    const config = await SiteConfig.findOne().lean();

    // If no page found in DB, we could either show a 404 or a default layout.
    // Given the request, we should ideally have it in the DB.
    if (!page) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Contact Page Not Found</h1>
                    <p className="text-slate-600">Please make sure the database is seeded with the "contact" page.</p>
                </div>
            </div>
        );
    }

    const sections = page.sections || [];

    return (
        <main>
            {sections.map((section: any, idx: number) => (
                <SectionRenderer
                    key={idx}
                    section={section}
                    config={JSON.parse(JSON.stringify(config))}
                />
            ))}
        </main>
    );
}
