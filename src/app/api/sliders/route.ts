import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Slider } from "@/models";

export async function GET() {
    await connectDB();
    // Sort by order asc
    const sliders = await Slider.find().sort({ order: 1 });
    return NextResponse.json(sliders);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        await connectDB();

        const newSlider = await Slider.create(body);
        return NextResponse.json(newSlider);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create slider" }, { status: 500 });
    }
}
