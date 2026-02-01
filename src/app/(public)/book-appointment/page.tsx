import AppointmentForm from "@/components/AppointmentForm";

export default function BookAppointmentPage() {
    return (
        <main>
            <section className="bg-[var(--primary)] py-20 text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold font-[var(--font-heading)] mb-4">Book an Appointment</h1>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Schedule a consultation with our experienced legal team. We're here to help you navigate your legal challenges.
                </p>
            </section>

            <section className="py-16 px-4">
                <AppointmentForm />
            </section>
        </main>
    );
}
