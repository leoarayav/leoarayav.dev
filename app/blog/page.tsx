import Link from "next/link"
import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import { formatDate } from "@/components/format-date"

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Lee mis publicaciones acerca del desarrollo software'
}

export default async function BlogPage() {
    return (
        <section className="mt-10">
            <h2 className="font-bold text-2xl mb-8 tracking-tighter">Lee mis publicaciones</h2>
            {
                allPosts
                    .sort((a, b) => {
                        if (new Date(a.date) > new Date(b.date)) {
                            return -1
                        }
                        return 1
                    })
                    .map((post) => (
                        <Link
                            className="flex flex-col space-y-2 mb-4 border px-4 py-3 border-neutral-800 text-clip bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-md hover:from-neutral-800 hover:to-neutral-900"
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                        >
                            <div className="w-full flex-col contents px-1">
                                <div className="text-sm mb-1">

                                    {
                                        formatDate(post.date)
                                            .charAt(0).toUpperCase() +
                                        formatDate(post.date).slice(1)
                                    }
                                </div>
                                <p className="text-neutral-50 tracking-tight font-semibold text-lg">
                                    {post.title}
                                </p>
                                <p className="mt-1 text-sm text-neutral-400">
                                    {post.description}
                                </p>
                            </div>
                        </Link>
                    ))
            }
        </section>
    )
}