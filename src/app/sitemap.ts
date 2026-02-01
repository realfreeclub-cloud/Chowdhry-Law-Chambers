import { MetadataRoute } from 'next';
import connectDB from '@/lib/db';
import { PracticeArea, Job, TeamMember, Page } from '@/models';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    await connectDB();

    // Static routes
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/practice-areas`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/team`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/careers`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/book-appointment`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
    ];

    // Dynamic practice areas
    const practiceAreas = await PracticeArea.find({ showOnHome: true }).lean();
    const practiceAreaRoutes = practiceAreas.map((area: any) => ({
        url: `${baseUrl}/practice-areas/${area.slug}`,
        lastModified: new Date(area.updatedAt || Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Dynamic jobs
    const jobs = await Job.find({ isPublished: true, isActive: true }).lean();
    const jobRoutes = jobs.map((job: any) => ({
        url: `${baseUrl}/careers/${job._id}`,
        lastModified: new Date(job.postedAt || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Dynamic pages
    const pages = await Page.find({ isPublished: true }).lean();
    const pageRoutes = pages.map((page: any) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page.updatedAt || Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    return [...staticRoutes, ...practiceAreaRoutes, ...jobRoutes, ...pageRoutes];
}
