import PracticeAreaEditor from "@/components/admin/PracticeAreaEditor";

export default async function EditPracticeArea({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PracticeAreaEditor id={id} />;
}
