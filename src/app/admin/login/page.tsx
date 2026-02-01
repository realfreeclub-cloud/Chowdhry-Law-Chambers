"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            console.log('Attempting login with:', email);

            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            console.log('SignIn response:', res);

            if (res?.error) {
                console.error('Login error:', res.error);
                setError("Invalid email or password. Please try again.");
            } else if (res?.ok) {
                console.log('Login successful, redirecting...');
                // Use window.location for a hard redirect
                window.location.href = "/admin/dashboard";
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } catch (err) {
            console.error('Login exception:', err);
            setError("Failed to connect to server. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <ShieldAlert className="w-12 h-12 text-slate-900 mx-auto mb-2" />
                    <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
                    <p className="text-slate-500">Restricted Access</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 outline-none text-slate-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 outline-none text-slate-900"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition-colors font-bold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
