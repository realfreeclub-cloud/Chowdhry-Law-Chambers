"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    category: string;
    author: string;
    publishedAt: string;
    readTime: number;
}

interface BlogSectionProps {
    data?: {
        title?: string;
        subtitle?: string;
        limit?: number;
        layout?: "grid" | "list";
        showCategory?: boolean;
        showAuthor?: boolean;
        showReadTime?: boolean;
    };
}

export default function BlogSection({ data }: BlogSectionProps) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const title = data?.title || "Latest Insights";
    const subtitle = data?.subtitle || "Stay informed with our legal insights and updates";
    const limit = data?.limit || 6;
    const layout = data?.layout || "grid";
    const showCategory = data?.showCategory !== false;
    const showAuthor = data?.showAuthor !== false;
    const showReadTime = data?.showReadTime !== false;

    useEffect(() => {
        fetch("/api/blog?status=Published")
            .then((res) => res.json())
            .then((data) => {
                const published = Array.isArray(data) ? data.filter((p: any) => p.status === "Published") : [];
                setPosts(published.slice(0, limit));
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [limit]);

    if (loading) {
        return (
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-4 bg-slate-200 rounded w-96 mx-auto animate-pulse"></div>
                    </div>
                    <div className={layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                                <div className="h-48 bg-slate-200 animate-pulse"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                                    <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) {
        return (
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
                    <p className="text-slate-600 mb-8">{subtitle}</p>
                    <p className="text-slate-500">No blog posts available yet.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {/* Blog Posts */}
                <div className={layout === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    : "max-w-4xl mx-auto space-y-6"
                }>
                    {posts.map((post) => (
                        <article
                            key={post._id}
                            className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${layout === "list" ? "flex flex-col md:flex-row" : ""
                                }`}
                        >
                            {/* Featured Image */}
                            <Link
                                href={`/blog/${post.slug}`}
                                className={`block overflow-hidden ${layout === "list" ? "md:w-1/3" : "h-48"
                                    }`}
                            >
                                <img
                                    src={post.featuredImage || "/placeholder-blog.jpg"}
                                    alt={post.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </Link>

                            {/* Content */}
                            <div className={`p-6 ${layout === "list" ? "md:w-2/3" : ""}`}>
                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3">
                                    {showCategory && post.category && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--secondary)]/10 text-[var(--secondary)]">
                                            {post.category}
                                        </span>
                                    )}
                                    {showAuthor && post.author && (
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {post.author}
                                        </span>
                                    )}
                                    {post.publishedAt && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </span>
                                    )}
                                    {showReadTime && post.readTime && (
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime} min read
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <Link href={`/blog/${post.slug}`}>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-[var(--secondary)] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                </Link>

                                {/* Excerpt */}
                                <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>

                                {/* Read More Link */}
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-[var(--secondary)] font-semibold hover:gap-3 transition-all"
                                >
                                    Read More
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 bg-[var(--secondary)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary)] transition-colors"
                    >
                        View All Articles
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
