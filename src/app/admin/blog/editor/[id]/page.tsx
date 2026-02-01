import BlogEditor from "@/components/admin/BlogEditor";

// Force dynamic rendering - do not prerender during build
export const dynamic = "force-dynamic";

export default async function NewBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <BlogEditor id={id} />;
}
