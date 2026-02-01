import connectDB from "@/lib/db";
import { SiteConfig } from "@/models";
import { cache } from "react";

export const getSiteConfig = cache(async () => {
    await connectDB();
    const config = await SiteConfig.findOne().lean();
    if (!config) return null;
    // Convert _id to string to avoid serialization warnings
    return JSON.parse(JSON.stringify(config));
});
