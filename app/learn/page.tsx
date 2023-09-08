import type { Metadata } from "next"
import { allCourses } from "contentlayer/generated"
import CourseLink from "@/components/course-link"

export const config: Metadata = {
    title: "Cursos",
    description: "Aprende algunos cursos de diferentes temas",
}

export default function CoursesPage() {
    return (
        <section className="mt-12">
            <h4 className="text-2xl font-bold tracking-tight">
                Cursos
            </h4>
            <p className="text-neutral-500 text-sm mt-1">
                Conoce, aprende y practica con los cursos disponibles los cuales redacté
                con el fin de ayudar a los quienes desean aprender sobre tecnología,
                programación, tecnologias de la información y más.
            </p>
            <hr className="max-w-xl border-t border-neutral-900 my-4" />
            <div className="flex flex-col gap-5 mt-8">
                {
                    allCourses.map((course) => (
                        <CourseLink 
                            slug={course.slug}
                            title={course.title}
                            description={course.description}
                            author={course.author}
                            duration={course.duration}
                        />
                    ))
                }
            </div>
        </section>
    )
}
