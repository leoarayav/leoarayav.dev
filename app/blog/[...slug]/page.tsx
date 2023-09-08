import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Markdownx } from "@/components/markdownx"
import { allPosts } from "@/.contentlayer/generated"
import { formatDate } from "@/components/format-date"

interface PostProps {
    params: { slug: string[] }
}

async function getPostFromParams(params: PostProps["params"]) {
    const slug = params?.slug.join("/")
    const post = allPosts.find((post) => post.slug === slug)
    if (!post) return notFound()
    return post
}

export async function generateMetadata({
    params,
}: PostProps): Promise<Metadata> {
    const post = await getPostFromParams(params)
    if (!post) return {}
    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            url: `https://localhost:3000/blog/${post.slug}`,
            publishedTime: post.date,
        },
    }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
    return allPosts.map((post) => ({
        slug: post.slug.split("/")
    }))
}

export default async function Blog({ params }: PostProps) {
    const post = await getPostFromParams(params)
    if (!post) return null
    return (
        <section className="my-12">
            <div className="mb-6 flex">
                <Link href="/blog" className="text-neutral-500 font-medium hover:text-neutral-300 transition-all duration-300">
                    &larr; Volver al blog
                </Link>
            </div>
            <div className="mt-2 mb-5 flex">
                <p className="text-sm bg-gradient-to-b text-clip from-neutral-900 to-neutral-700 px-4 py-1 text-neutral-200 font-semibold rounded-full">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </p>
                <p className="text-sm ml-4 text-neutral-400 mt-1">
                    {formatDate(post.date).charAt(0).toUpperCase() + formatDate(post.date).slice(1)}
                </p>
            </div>
            <h1 className="font-bold text-2xl tracking-tight max-w-[650px]">
                {post.title}
            </h1>
            <p className="text-md mt-1 tracking-tight text-neutral-500">
                {post.description}
            </p>
            <hr className="border-t border-neutral-900 my-6" />
            <Markdownx code={post.body.code} />
        </section>
    )
}