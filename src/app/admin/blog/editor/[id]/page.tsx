import BlogEditor from "@/components/admin/BlogEditor";

export default async function NewBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <BlogEditor id={id} />;
}
