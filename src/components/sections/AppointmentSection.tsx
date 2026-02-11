"use client";

import AppointmentForm from "@/components/AppointmentForm";

export default function AppointmentSection({ data }: { data: any }) {
    const title = data?.title || "Schedule a Consultation";
    const subtitle = data?.subtitle || "Get in touch with our legal experts for a dedicated case review.";
    const description = data?.description;

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">{title}</h2>
                    <p className="text-lg text-slate-600 font-medium">{subtitle}</p>
                    {description && <p className="mt-4 text-slate-500">{description}</p>}
                </div>

                <AppointmentForm />
            </div>
        </section>
    );
}
