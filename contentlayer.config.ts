import type { ComputedFields } from "contentlayer/source-files"
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files"

import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: ComputedFields = {
    slug: {
        type: "string",
        resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
        type: "string",
        resolve: (doc) => doc._raw.sourceFilePath,
    },
}

/**
 * Author nested type
 * @note This is unnecessary in post creation
 */
const Author = defineNestedType(() => ({
    name: 'Author',
    fields: {
        name: { type: "string", required: true },
        alias: { type: "string", required: true },
    },
}))

// Blog post type definition
export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: 'posts/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
        date: { type: "string", required: true },
        category: { type: "string", required: true },
        author: { type: "string" },
    },
    computedFields: {
        ...computedFields,
        structuredData: {
            type: 'json',
            resolve: (doc) => ({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: doc.title,
                datePublished: doc.date,
                dateModified: doc.date,
                description: doc.description,
                author: doc.author
            }),
        },
    },
}))

export const Course = defineDocumentType(() => ({
    name: 'Course',
    filePathPattern: 'courses/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
        author: { type: "nested", required: true, of: Author },
        duration: { type: "string", required: true },
        level: { type: "string", required: true },
    },
    computedFields: {
        ...computedFields,
    },
}))

// Content source
export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post, Course],
    mdx: {
        cwd: process.cwd(),
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug, [ 
                rehypePrettyCode, { theme: 'github-dark' } 
            ],
            [
                rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }
            ],
        ],
    },
})