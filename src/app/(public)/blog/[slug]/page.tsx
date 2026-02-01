import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import { BlogPost } from "@/models";
import ReactMarkdown from "react-markdown";
import { Calendar, Clock, User, ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    await connectDB();
    const post = await BlogPost.findOne({ slug, status: 'Published' }).lean();

    if (!post) {
        return {
            title: "Article Not Found",
        };
    }

    return {
        title: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDesc || post.excerpt,
        openGraph: {
            title: post.seo?.metaTitle || post.title,
            description: post.seo?.metaDesc || post.excerpt,
            images: post.featuredImage ? [post.featuredImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    await connectDB();

    // Increment views (silent update)
    await BlogPost.findOneAndUpdate({ slug }, { $inc: { views: 1 } });

    const post = await BlogPost.findOne({ slug, status: 'Published' }).lean();

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-slate-50 pb-20">
            {/* Header Section with Image */}
            <div className="relative w-full h-[60vh] bg-slate-900">
                {post.featuredImage && (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
                            style={{ backgroundImage: `url(${post.featuredImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                    </>
                )}

                <div className="absolute inset-0 flex flex-col justify-end pb-20">
                    <div className="container mx-auto max-w-4xl px-4">
                        <Link href="/blog" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors text-sm font-medium uppercase tracking-widest pl-1">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Articles
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-[var(--secondary)] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                                {post.category || "General"}
                            </span>
                            <div className="flex items-center text-white/80 text-sm font-medium gap-6">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[var(--secondary)]" />
                                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString(undefined, {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[var(--secondary)]" />
                                    {post.readTime || 5} min read
                                </span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white border-2 border-[var(--secondary)]">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold uppercase tracking-wide">Written By</p>
                                <p className="text-white/70 text-sm">Legal Team</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto max-w-4xl px-4 -mt-10 relative z-10">
                <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-slate-100">
                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-[var(--secondary)] hover:prose-a:text-[var(--secondary)]/80 prose-img:rounded-xl prose-img:shadow-lg">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                        <div className="flex gap-2">
                            {post.tags?.map((tag: string) => (
                                <span key={tag} className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wide">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <button className="flex items-center space-x-2 text-slate-500 hover:text-[var(--secondary)] transition-colors text-sm font-bold uppercase tracking-widest">
                            <Share2 className="w-4 h-4" />
                            <span>Share Article</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
