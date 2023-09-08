import { FileBox, Pen } from "lucide-react"

interface PostLinkProps {
    slug: string
    title: string
    description: string
    author: {
        name: string
        alias: string
    }
    duration: string
}

export default async function CourseLink({
    slug,
    title,
    description,
    author,
    duration,
}: PostLinkProps) {
    return (
        <a
            key={slug}
            href={`/learn/${slug}`}
            className="flex items-center w-full justify-between py-6 px-6 md:px-6 border border-neutral-900 rounded-md hover:bg-neutral-900 hover:text-white transition duration-300 ease-in-out"
        >
            <div className="flex flex-col">
                <h5 className="text-xl font-bold tracking-tight">
                    {title}
                </h5>
                <p className="text-neutral-500 text-sm mt-1">
                    {description}
                </p>
                <p className="text-neutral-200 text-sm mt-1">
                    <Pen size={16} className="inline mr-2" />
                    {author.name} (@{author.alias})
                </p>
            </div>
            <div>
                <FileBox />
            </div>
        </a>
    )
}