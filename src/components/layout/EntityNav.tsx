'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  name: string
  path: string
}

interface EntityNavProps {
  items: NavItem[]
  basePath: string
}

export default function EntityNav({ items, basePath }: EntityNavProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="w-full bg-zoo-cream border-b border-zoo-border" style={{ margin: '-1.5rem', marginBottom: '2rem', width: 'calc(100% + 3rem)' }}>
      <div className="flex px-4 md:px-8">
        {items.map((item) => (
          <Link
            key={item.path}
            href={`${basePath}${item.path}`}
            className={`flex-1 text-center py-4 text-sm font-semibold transition-colors border-b-2
              ${isActive(`${basePath}${item.path}`) 
                ? 'border-zoo-gold text-zoo-forest' 
                : 'border-transparent text-gray-500 hover:text-zoo-forest hover:border-zoo-sage'
              }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
} 
