"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, format } from "date-fns";
import {
    Calendar, User, Mail, Phone, Briefcase, MessageSquare,
    CheckCircle, ArrowRight, ArrowLeft, Loader2, Info, Clock
} from "lucide-react";

export default function AppointmentForm() {
    const [step, setStep] = useState(1);
    const [practiceAreas, setPracticeAreas] = useState<any[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        practiceArea: "",
        date: setHours(setMinutes(new Date(), 30), 9), // Default to 9:30 AM today
        message: "",
    });

    useEffect(() => {
        fetch("/api/practice-areas")
            .then(res => res.json())
            .then(data => setPracticeAreas(data))
            .catch(console.error);
    }, []);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const isStepValid = () => {
        if (step === 1) return formData.name && formData.email && formData.phone;
        if (step === 2) return formData.practiceArea;
        return true;
    };

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
                setFormData({
                    name: "", email: "", phone: "", practiceArea: "",
                    date: setHours(setMinutes(new Date(), 30), 9),
                    message: ""
                });
                setStep(1);
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
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center py-12 px-6"
            >
                <div className="bg-white border border-green-100 rounded-3xl p-12 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                    <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 font-[var(--font-heading)]">Request Received</h2>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out. Our legal team will review your request and contact you within 24 hours to confirm your appointment.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Book Another
                    </button>
                </div>
            </motion.div>
        );
    }

    const steps = [
        { number: 1, title: "Your Details" },
        { number: 2, title: "Case Info" },
        { number: 3, title: "Date & Time" }
    ];

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-w-4xl mx-auto">
            {/* Progress Header */}
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <div className="flex space-x-2">
                    {steps.map((s) => (
                        <div key={s.number} className="flex items-center">
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300
                                ${step >= s.number ? 'bg-[var(--secondary)] text-white' : 'bg-slate-200 text-slate-500'}
                            `}>
                                {step > s.number ? <CheckCircle className="w-4 h-4" /> : s.number}
                            </div>
                            {s.number !== 3 && <div className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${step > s.number ? 'bg-[var(--secondary)]' : 'bg-slate-200'}`}></div>}
                        </div>
                    ))}
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Step {step} of 3</span>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-10 min-h-[400px] flex flex-col">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex-1 space-y-6"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <User className="w-6 h-6 text-[var(--secondary)]" />
                                Personal Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent transition-all outline-none"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full pl-11 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent transition-all outline-none"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-11 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent transition-all outline-none"
                                                placeholder="+91 98765 43210"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex-1 space-y-6"
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-[var(--secondary)]" />
                                Case Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Practice Area</label>
                                    <select
                                        value={formData.practiceArea}
                                        onChange={e => setFormData({ ...formData, practiceArea: e.target.value })}
                                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent transition-all outline-none appearance-none"
                                    >
                                        <option value="">Select the type of legal service...</option>
                                        {practiceAreas.map(area => (
                                            <option key={area._id} value={area.title}>{area.title}</option>
                                        ))}
                                        <option value="Other">Other Legal Matter</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Brief Message (Optional)</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                                        <textarea
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full pl-11 p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--secondary)] focus:border-transparent transition-all outline-none h-32 resize-none"
                                            placeholder="Please briefly describe your legal situation so we can prepare for the consultation..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex-1 space-y-8"
                        >
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-3">
                                    <Calendar className="w-8 h-8 text-[var(--secondary)]" />
                                    Choose Your Schedule
                                </h3>
                                <p className="text-slate-500">Select a date and time that works best for your consultation.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Calendar Sidebar */}
                                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
                                    <label className="block text-sm font-bold text-slate-700 mb-4 self-start">1. Select Date</label>
                                    <div className="appointment-datepicker-inline w-full flex justify-center">
                                        <DatePicker
                                            selected={formData.date}
                                            onChange={(date: Date | null) => date && setFormData({ ...formData, date })}
                                            inline
                                            minDate={new Date()}
                                            calendarClassName="premium-calendar"
                                        />
                                    </div>
                                </div>

                                {/* Time Selection */}
                                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                    <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[var(--secondary)]" />
                                        2. Select Time Slot
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            "09:00 AM", "10:00 AM", "11:00 AM",
                                            "12:00 PM", "02:00 PM", "03:00 PM",
                                            "04:00 PM", "05:00 PM", "06:00 PM"
                                        ].map((time) => {
                                            const [hourStr, minPart] = time.split(':');
                                            const [minStr, ampm] = minPart.split(' ');
                                            let hour = parseInt(hourStr);
                                            if (ampm === "PM" && hour !== 12) hour += 12;
                                            if (ampm === "AM" && hour === 12) hour = 0;
                                            const minutes = parseInt(minStr);

                                            const slotDate = setHours(setMinutes(new Date(formData.date), minutes), hour);
                                            const isSelected = format(formData.date, 'p') === time;

                                            return (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, date: slotDate })}
                                                    className={`
                                                        p-3 rounded-xl text-sm font-bold transition-all duration-300 border-2
                                                        ${isSelected
                                                            ? 'bg-[var(--secondary)] border-[var(--secondary)] text-white shadow-lg shadow-[var(--secondary)]/20 scale-105'
                                                            : 'bg-slate-50 border-transparent text-slate-600 hover:border-slate-200 hover:bg-white'}
                                                    `}
                                                >
                                                    {time}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Selected Schedule</h4>
                                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                                            <Calendar className="w-4 h-4 text-[var(--secondary)]" />
                                            {format(formData.date, 'MMMM d, yyyy')}
                                            <span className="mx-1 text-slate-300">at</span>
                                            <Clock className="w-4 h-4 text-[var(--secondary)]" />
                                            {format(formData.date, 'h:mm aa')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50/50 p-5 rounded-2xl flex items-start gap-4 border border-blue-100">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                </div>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    <span className="font-bold">Important:</span> This is a preferred time request. We will contact you shortly to confirm the exact availability of our legal team for this slot.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    <style jsx global>{`
                        .premium-calendar {
                            border: none !important;
                            font-family: inherit !important;
                        }
                        .react-datepicker__header {
                            background-color: white !important;
                            border-bottom: 1px solid #f1f5f9 !important;
                            padding-top: 1rem !important;
                        }
                        .react-datepicker__day--selected {
                            background-color: var(--secondary) !important;
                            border-radius: 0.75rem !important;
                            color: white !important;
                        }
                        .react-datepicker__day:hover {
                            border-radius: 0.75rem !important;
                        }
                        .react-datepicker {
                            box-shadow: none !important;
                            border: none !important;
                        }
                    `}</style>
                </AnimatePresence>

                {/* Footer Controls */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex items-center text-slate-500 font-bold hover:text-slate-800 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </button>
                    ) : (
                        <div></div> // Spacer
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!isStepValid()}
                            className="flex items-center bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Next Step
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center bg-[var(--secondary)] text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 disabled:opacity-70 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                "Confirm Appointment"
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
