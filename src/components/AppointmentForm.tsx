"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Mail, Phone, Briefcase, MessageSquare, CheckCircle } from "lucide-react";

export default function AppointmentForm() {
    const [practiceAreas, setPracticeAreas] = useState<any[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        practiceArea: "",
        date: "",
        message: "",
    });

    useEffect(() => {
        fetch("/api/practice-areas")
            .then(res => res.json())
            .then(data => setPracticeAreas(data))
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: "", email: "", phone: "", practiceArea: "", date: "", message: "" });
            } else {
                alert("Failed to submit. Please try again.");
            }
        } catch {
            alert("Error submitting appointment.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16 px-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-12">
                    <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Appointment Request Received!</h2>
                    <p className="text-slate-600 mb-8">
                        Thank you for reaching out. Our team will review your request and contact you shortly to confirm your appointment.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                    >
                        Book Another Appointment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 font-[var(--font-heading)]">Schedule a Consultation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        <User className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                        Full Name *
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        <Mail className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                        Email Address *
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        <Phone className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        <Briefcase className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                        Practice Area
                    </label>
                    <select
                        value={formData.practiceArea}
                        onChange={e => setFormData({ ...formData, practiceArea: e.target.value })}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                    >
                        <option value="">Select an area</option>
                        {practiceAreas.map(area => (
                            <option key={area._id} value={area.title}>{area.title}</option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        <Calendar className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                        Preferred Date & Time *
                    </label>
                    <input
                        type="datetime-local"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        <MessageSquare className="w-4 h-4 mr-2 text-[var(--secondary)]" />
                        Message (Optional)
                    </label>
                    <textarea
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 border border-slate-300 rounded-lg h-32 focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent"
                        placeholder="Tell us briefly about your legal matter..."
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--secondary)] text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50"
            >
                {loading ? "Submitting..." : "Request Appointment"}
            </button>

            <p className="text-sm text-slate-500 text-center mt-4">
                * Required fields. We'll contact you within 24 hours to confirm your appointment.
            </p>
        </form>
    );
}
