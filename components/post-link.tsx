interface PostLinkProps {
    slug: string
    title: string
    brief: string
}

export default async function PostLink({
    slug,
    title,
    brief
}: PostLinkProps) {
    return (
        <a 
            href={`/blog/${slug}`}
            className="border border-neutral-700 bg-neutral-900 rounded flex items-center justify-between px-3 py-4 w-full"
        >
            <div className="flex flex-col">
                <p className="font-bold">{title}</p>
                <p className="text-neutral-300 mt-1">
                    {brief}
                </p>                
            </div>
            <div className="text-neutral-300">
                &rarr;
            </div>
        </a>
    )
}