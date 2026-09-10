import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItemProps {
  icon: ReactNode
  text: string
  href: string
}

export default function SidebarItem({ icon, text, href }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm font-medium hover:bg-white/10 ${isActive ? 'bg-white/15 text-white shadow-inner' : 'text-white/70'}`}>
        {icon}
        <span>{text}</span>
      </div>
    </Link>
  )
} 
