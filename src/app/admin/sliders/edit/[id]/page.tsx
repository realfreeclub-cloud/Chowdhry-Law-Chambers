import SliderEditor from "@/components/admin/SliderEditor";

export const dynamic = "force-dynamic";

export default async function EditSlider({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <SliderEditor id={id} />;
}
