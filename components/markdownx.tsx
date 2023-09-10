import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

const Alert = (props: any) => {
    let { type = "" } = props;
    switch (type) {
        case "success":
            type = "bg-green-900 border-green-700 text-green-200";
            break;
        case "warning":
            type = "bg-yellow-900 border-yellow-700 text-yellow-200";
            break;
        case "error":
            type = "bg-red-900 border-red-700 text-red-200";
            break;
        case "info":
            type = "bg-blue-900 border-blue-700 text-blue-200";
            break;
        default:
            type = "bg-neutral-900 border-neutral-700 text-neutral-200";
    }
    return (
        <div className={`border-l-4 bg-opacity-20 rounded-b px-4 ${type}`} role="alert">
            <div className="flex">
                <div>
                    <p className="font-bold -mb-3">{props.title}</p>
                    <p className="text-md">{props.children}</p>
                </div>
            </div>
        </div>
    )
}

const RoundedImage = (props: any) => {
    return <Image alt={props.alt} className="rounded-lg border border-neutral-800 px-4 py-4" {...props} />
}

const Callout = (props: any) => {
    return (
        <div className="px-4 py-3 border border-neutral-700 bg-neutral-950 rounded p-1 text-sm flex items-center text-neutral-100 mb-8">
            <div className="flex items-center w-4 mr-4">{props.emoji}</div>
            <div className="w-full callout">{props.children}</div>
        </div>
    )
}

const TableOfContents = (props: any) => {
    return (
        <div className="border border-neutral-800 rounded-md p-2">
            <h5 className="font-bold text-md px-4 mt-4">
                {props.title}
            </h5>
            <div className="px-4 inline-block">
                {props.children}
            </div>
        </div>
    )
}

const components = {
    Alert,
    Callout,
    TableOfContents,
    Image: RoundedImage,
}

interface MarkdownxProps {
    code: string
}

export function Markdownx({ code }: MarkdownxProps) {
    const Component = useMDXComponent(code)
    return (
        <article className="prose prose-quoteless prose-invert">
            <Component components={components} />
        </article>
    )
}