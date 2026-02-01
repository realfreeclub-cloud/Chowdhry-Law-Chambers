import JobEditor from "@/components/admin/JobEditor";

export default async function EditJob({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <JobEditor id={id} />;
}
