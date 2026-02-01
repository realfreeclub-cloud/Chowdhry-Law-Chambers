import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import { Page, SiteConfig } from "@/models";
import SectionRenderer from "@/components/sections/SectionRenderer";
import MapSection from "@/components/MapSection";
import ClientLogos from "@/components/sections/ClientLogos";

// Ensure dynamic rendering
export const dynamic = "force-dynamic";

export default async function HomePage() {
  await connectDB();
  const page = await Page.findOne({ slug: "home", isPublished: true }).lean();
  const config = await SiteConfig.findOne().lean();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Welcome. Please verify the database is seeded.</h1>
      </div>
    )
  }

  const sections = page.sections || [];

  return (
    <main>
      {sections.map((section: any, idx: number) => (
        <SectionRenderer key={idx} section={section} />
      ))}

      <ClientLogos
        title={config?.clientsSection?.title}
        subtitle={config?.clientsSection?.subtitle}
      />

      {config?.contact?.showMapOnHome && config?.contact?.mapUrl && (
        <MapSection mapUrl={config.contact.mapUrl} />
      )}
    </main>
  );
}
