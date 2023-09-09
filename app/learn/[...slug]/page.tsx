import type { Metadata } from "next"
import { allCourses } from "contentlayer/generated"
import { Markdownx } from "@/components/markdownx"
import { notFound } from "next/navigation"
import CourseLevel from "@/components/course-level"

import { Clock, Boxes, FileSignature } from "lucide-react"
import { ScrollTop } from "@/components/scroll-top"

interface CourseProps {
    params: { slug: string[] }
}

async function getCourseFromParams(params: CourseProps["params"]) {
    const slug = params.slug.join("/")
    const course = allCourses.find((course) => course.slug === slug)
    if (!course) {
        notFound()
    }
    return course
}

export async function generateMetadata({
    params,
}: CourseProps): Promise<Metadata> {
    const course = await getCourseFromParams(params)
    if (!course) return notFound()
    return {
        title: 'Curso: ' + course.title,
        description: course.description,
        openGraph: {
            type: 'article',
            authors: [course.author.name],
        }
    }
}

export async function generateStaticParams(): Promise<CourseProps["params"][]> {
    return allCourses.map((course) => ({
        slug: course.slug.split("/"),
    }))
}

export default async function CoursePage({ params }: CourseProps) {
    const course = await getCourseFromParams(params)
    if (!course) return notFound()
    return (
        <article className="my-12">
            <ScrollTop />
            <h1 className="text-3xl text-center font-extrabold tracking-tight">
                {course.title}
            </h1>
            <p className="mt-4 text-center text-neutral-500 text-sm">
                {course.description}
            </p>
            <div className="text-center mt-4 text-sm justify-center items-center flex space-x-5">
                <p>
                    <Clock className="w-4 h-4 inline mr-1" /> <span className="text-neutral-400">{course.duration}</span>
                </p>
                <p className="ml-4">
                    <Boxes className="w-5 h-5 inline mr-1" /> 
                    <CourseLevel level={course.level} />
                </p>
                <p className="text-sm">
                    <FileSignature className="w-4 h-4 inline mr-1" />
                    <span className="text-neutral-400">{course.author.name} (@{course.author.alias})</span>
                </p>
            </div>
            <hr className="max-w-6xl border-t border-neutral-900 my-4" />
            <Markdownx code={course.body.code} />
        </article>
    )
}