import PracticeAreaEditor from "@/components/admin/PracticeAreaEditor";

export const dynamic = "force-dynamic";

export default async function EditPracticeArea({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PracticeAreaEditor id={id} />;
}
