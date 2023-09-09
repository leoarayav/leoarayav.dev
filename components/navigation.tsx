'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { sitedata } from '@/sitedata'

export function Navigation({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const routes = [
        {
            href: '/blog',
            label: 'Blog',
            active: pathname === '/blog',
        },
        {
            href: '/learn',
            label: 'Cursos',
            active: pathname === '/learn',
        },
        {
            href: '/contact',
            label: 'Contacto',
            active: pathname === '/contact',
        },
        {
            href: sitedata.github.user,
            label: 'GitHub',
            active: false,
        }
    ]
    return (
        <nav
            className={
                clsx(
                    'flex list-none m-0 p-0 space-x-4 justify-center items-center md:justify-normal',
                    className
                )
            }
            {...props}
        >
            <p className='text-xl font-bold mr-4 text-teal-500'>
                <a href="/">
                    {sitedata.author.alias} {' / '}
                </a>
            </p>
            {routes.map((route) => (
                <Link 
                    href={route.href} 
                    key={route.href}
                    className={
                        clsx(
                            "text-sm transition-colors hover:text-neutral-400 font-semibold tracking-tight",
                            route.active ? 'text-teal-500' : 'text-neutral-500'
                        )
                    }
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}