import TeamEditor from "@/components/admin/TeamEditor";

export const dynamic = "force-dynamic";

export default async function EditTeamMember({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <TeamEditor id={id} />;
}
