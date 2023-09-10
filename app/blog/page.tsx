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
        <section className="mt-10 flex flex-col gap-6">
            <h2 className="font-bold text-2xl tracking-tighter text-neutral-600">
                Lee mis publicaciones
            </h2>
            <p className="text-md max-w-xl">
                En este espacio encontrarás mis publicaciones donde
                comparto conocimiento y experiencias sobre el desarrollo de software,
                tecnologías, herramientas y mucho más.
            </p>
            <hr className="max-w-xl border-t border-neutral-900" />
            {
                allPosts
                    .sort((a, b) => {
                        if (new Date(a.date) > new Date(b.date)) {
                            return -1
                        }
                        return 1
                    })
                    .map((post) => (
                        <a
                            className="flex flex-col items-center w-full justify-between py-4 px-4 md:px-6 border border-neutral-900 rounded-md hover:bg-neutral-900 hover:text-white transition duration-300 ease-in-out"
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                        >
                            <div className="w-full px-1">
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
                        </a>
                    ))
            }
        </section>
    )
}