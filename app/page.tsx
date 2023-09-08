import PostLink from "@/components/post-link"
import { allPosts } from "contentlayer/generated"
import { Suspense } from "react"
import { sitedata } from "@/sitedata"

const MAX_FEATURED_POSTS = 3

export default function Home() {
  return (
    <section>
      <h2 className="font-bold text-3xl mt-16 tracking-tighter">
        {sitedata.author.name}
        <span className="ml-2.5 text-sm tracking-normal bg-neutral-900/50 p-1 px-2 rounded-lg font-mono">
          @{sitedata.author.alias}
        </span>
      </h2>
      <p className="mt-2 text-sm text-neutral-500">
        {sitedata.author.status}
      </p>
      <h4 className="mt-4 text-xl text-neutral-400 font-bold tracking-tight">Acerca de mi</h4>
      <p className="mt-1 max-w-2xl text-neutral-50">
        Soy desarrollador software de manera independiente
        aprendiendo cada dia y desarrollando proyectos
        con fines de autoaprendizaje y enseñar a los demas,
        quiero que los demás aprendan de mi y se proyecte
        mi experiencia en esta área de la tecnología.
      </p>
      <hr className="my-6 max-w-xl border-t border-neutral-900" />
      <h4 className="mt-4 text-xl text-neutral-400 font-bold tracking-tight">Blog</h4>
      <p className="mt-2 max-w-2xl text-neutral-50 mb-4">
        He creado mi propio blog para compartir mis conocimientos
        y experiencias en el mundo del desarrollo de software,
        también para compartir mis proyectos y tutoriales, articulos y
        novedades de la tecnología y la programación en general.
      </p>
      <div className="my-8 flex flex-col space-y-4 w-full">
        <Suspense>
          {
            allPosts
              .slice(0, MAX_FEATURED_POSTS)
              .map((post) => (
                <PostLink
                  key={post._id}
                  slug={post.slug}
                  title={post.title}
                  brief={post.description}
                />
              ))
          }
        </Suspense>
      </div>
    </section>
  )
}
