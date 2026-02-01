import Link from "next/link";
import connectDB from "@/lib/db";
import { BlogPost } from "@/models";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Legal Insights & Articles | Law Firm",
    description: "Read our latest articles on corporate law, family law, and legal advice from our expert attorneys.",
};

export const dynamic = "force-dynamic";

export default async function BlogListingPage() {
    await connectDB();
    const posts = await BlogPost.find({ status: 'Published' })
        .sort({ publishedAt: -1 })
        .lean();

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white py-20 px-4">
                <div className="container mx-auto max-w-6xl text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Legal Insights</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Stay informed with the latest legal news, case studies, and expert analysis from our team.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto max-w-6xl px-4 py-16">
                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No articles published yet. Check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <Link href={`/blog/${post.slug}`} key={post._id} className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
                                {/* Image */}
                                <div className="h-56 bg-slate-200 relative overflow-hidden">
                                    {post.featuredImage ? (
                                        <div
                                            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url(${post.featuredImage})` }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                            <span className="text-sm font-medium uppercase tracking-wider">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-900 border border-white/50">
                                        {post.category || "General"}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium uppercase tracking-wide">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                            })}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime || 5} min read
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[var(--secondary)] transition-colors line-clamp-2 leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 bg-transparent flex-1 leading-relaxed">
                                        {post.excerpt || "Click to read full article..."}
                                    </p>

                                    <div className="flex items-center text-[var(--secondary)] text-sm font-bold uppercase tracking-widest mt-auto group-hover:translate-x-2 transition-transform">
                                        Read Article
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
