import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Appointment } from "@/models";
import { validateRequestBody, schemas } from "@/lib/validation";

// Public endpoint - anyone can submit
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input
        const validation = validateRequestBody(body, schemas.appointment);
        if (!validation.valid) {
            return NextResponse.json({
                error: "Invalid input",
                details: validation.errors
            }, { status: 400 });
        }

        await connectDB();
        const newAppointment = await Appointment.create(body);
        return NextResponse.json({ success: true, data: newAppointment });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
    }
}

// Admin only - list all appointments
export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    return NextResponse.json(appointments);
}
