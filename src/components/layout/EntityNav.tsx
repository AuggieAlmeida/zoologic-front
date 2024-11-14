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
    <nav className="w-full bg-white shadow-sm" style={{ margin: '-1.5rem', marginBottom: '3rem', width: 'calc(100% + 3rem)' }}>
      <div className="flex">
        {items.map((item) => (
          <Link
            key={item.path}
            href={`${basePath}${item.path}`}
            className={`flex-1 text-center py-3 transition-colors rounded-b-lg
              ${isActive(`${basePath}${item.path}`) 
                ? 'bg-primary-green text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
} 