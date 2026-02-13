"use client";

import { useEffect, useState } from "react";
import { Calendar, User, Mail, Phone, Briefcase, MessageSquare, Clock } from "lucide-react";

export default function AppointmentsAdmin() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const res = await fetch("/api/appointments");
            const data = await res.json();
            setAppointments(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await fetch(`/api/appointments/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            fetchAppointments();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this appointment?")) return;
        await fetch(`/api/appointments/${id}`, { method: "DELETE" });
        fetchAppointments();
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
                <div className="text-sm text-slate-500">
                    Total: <span className="font-bold text-slate-900">{appointments.length}</span>
                </div>
            </div>

            <div className="space-y-4">
                {appointments.map((appt) => (
                    <div key={appt._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-xl font-bold text-slate-900">{appt.name}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                        appt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                            appt.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {appt.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                        {appt.email}
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-slate-400" />
                                        {appt.phone}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                        {new Date(appt.date).toLocaleString()}
                                    </div>
                                    {appt.practiceArea && (
                                        <div className="flex items-center">
                                            <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                                            {appt.practiceArea}
                                        </div>
                                    )}
                                    {appt.teamMember && (
                                        <div className="flex items-center text-indigo-600 font-medium my-1 col-span-2">
                                            <User className="w-4 h-4 mr-2" />
                                            Preferred Attorney: {appt.teamMember}
                                        </div>
                                    )}
                                </div>

                                {appt.message && (
                                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                                        <div className="flex items-start">
                                            <MessageSquare className="w-4 h-4 mr-2 text-slate-400 mt-0.5" />
                                            <p className="text-sm text-slate-700">{appt.message}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center mt-3 text-xs text-slate-400">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Submitted: {new Date(appt.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-slate-100">
                            <button
                                onClick={() => updateStatus(appt._id, 'Pending')}
                                className="px-3 py-1.5 text-xs font-medium rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => updateStatus(appt._id, 'Confirmed')}
                                className="px-3 py-1.5 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => updateStatus(appt._id, 'Completed')}
                                className="px-3 py-1.5 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                            >
                                Complete
                            </button>
                            <button
                                onClick={() => updateStatus(appt._id, 'Cancelled')}
                                className="px-3 py-1.5 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(appt._id)}
                                className="ml-auto px-3 py-1.5 text-xs font-medium rounded bg-slate-100 text-slate-700 hover:bg-slate-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {appointments.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                        <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No appointments yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
