import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import { Page } from "@/models";
import SectionRenderer from "@/components/sections/SectionRenderer";

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

// Ensure dynamic rendering
export const dynamic = "force-dynamic";

export default async function DynamicPage({ params }: PageProps) {
    const { slug } = await params;
    const slugStr = slug.join("/");

    await connectDB();
    const page = await Page.findOne({ slug: slugStr, isPublished: true }).lean();

    if (!page) {
        return notFound();
    }

    // Parse generic content if sections are missing (legacy check)
    // or iterate over sections
    const sections = page.sections || [];

    // Fetch config for sections
    const { getSiteConfig } = await import("@/lib/config");
    const config = await getSiteConfig();

    return (
        <main>
            {/* Use sections if available */}
            {sections.map((section: any, idx: number) => (
                <SectionRenderer key={idx} section={section} config={JSON.parse(JSON.stringify(config))} />
            ))}
        </main>
    );
}
