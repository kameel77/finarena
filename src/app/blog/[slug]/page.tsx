import { getPostBySlug, getPosts } from '@/lib/ghost';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Generowanie ścieżek dla wszystkich postów (dla SSG)
export async function generateStaticParams() {
    const posts = await getPosts({ limit: 100 });
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-text-primary mb-4">Post nie znaleziony</h1>
                    <Link href="/blog" className="text-primary hover:underline">
                        Wróć do bloga
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Powrót */}
                <Link href="/blog" className="inline-flex items-center text-primary mb-8 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Wróć do bloga
                </Link>

                {/* Nagłówek */}
                <header className="mb-12">
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {post.tags?.map((tag) => (
                            <span key={tag.id} className="text-sm px-3 py-1 bg-primary-light text-primary rounded-full">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-text-secondary">
                        <span>{formatDate(post.published_at)}</span>
                        <span>•</span>
                        <span>{post.reading_time} min czytania</span>
                    </div>
                </header>

                {/* Obrazek */}
                {post.feature_image && (
                    <div className="relative h-96 w-full mb-12 rounded-xl overflow-hidden">
                        <Image
                            src={post.feature_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Treść - stylowana tak jak reszta strony */}
                <article
                    className="prose prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary hover:prose-a:text-primary-dark prose-strong:text-text-primary"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />

                {/* Autor */}
                {post.authors?.map((author) => (
                    <div key={author.id} className="mt-16 pt-8 border-t border-border">
                        <div className="flex items-center gap-4">
                            {author.profile_image && (
                                <Image
                                    src={author.profile_image}
                                    alt={author.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                />
                            )}
                            <div>
                                <p className="font-semibold text-text-primary">{author.name}</p>
                                {author.bio && <p className="text-text-secondary text-sm">{author.bio}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
