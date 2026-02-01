import { getPosts } from '@/lib/ghost';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default async function BlogPage() {
    const posts = await getPosts({ limit: 10 });

    return (
        <div className="min-h-screen bg-background-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <h1 className="text-4xl font-bold text-text-primary mb-8">Blog</h1>
                <p className="text-text-secondary mb-12 max-w-2xl">
                    Artykuły o transformacji cyfrowej, AI, automatyzacji i rozwoju organizacyjnym.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                            {post.feature_image && (
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={post.feature_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex gap-2 mb-3 flex-wrap">
                                    {post.tags?.map((tag) => (
                                        <span key={tag.id} className="text-xs px-2 py-1 bg-primary-light text-primary rounded-full">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-xl font-semibold text-text-primary mb-3 line-clamp-2">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-sm text-text-light">
                                    <span>{formatDate(post.published_at)}</span>
                                    <span>{post.reading_time} min czytania</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
