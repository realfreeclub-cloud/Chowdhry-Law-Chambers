import PageEditor from "@/components/admin/PageEditor";

// Force dynamic rendering - do not prerender during build
export const dynamic = "force-dynamic";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PageEditor id={id} />;
}
