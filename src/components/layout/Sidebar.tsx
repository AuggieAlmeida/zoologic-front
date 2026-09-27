'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaHome, FaPaw, FaUserMd, FaWarehouse, FaUsers, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa'
import SidebarItem from './SidebarItem'
import { clearAuthSession } from '@/services/api'

interface SidebarProps {
  // Only meaningful below the md breakpoint, where the sidebar is a drawer.
  open: boolean
}

export default function Sidebar({ open }: SidebarProps) {
  const router = useRouter()
  const menuItems = [
    { icon: <FaHome size={20} />, text: "Dashboard", href: "/dashboard" },
    { icon: <FaPaw size={20} />, text: "Animais", href: "/animais" },
    { icon: <FaUsers size={20} />, text: "Colaboradores", href: "/colaboradores" },
    { icon: <FaUserMd size={20} />, text: "Veterinários", href: "/veterinarios" },
    { icon: <FaWarehouse size={20} />, text: "Habitats", href: "/habitats" },
    { icon: <FaClipboardList size={20} />, text: "Relatórios", href: "/relatorios" },
    { icon: <FaChartBar size={20} />, text: "Estatísticas", href: "/estatisticas" },
    { icon: <FaCog size={20} />, text: "Configurações", href: "/configuracoes" }
  ]

  return (
    <div id="app-sidebar" className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 bg-zoo-forest text-white h-screen flex flex-col shadow-xl transition-transform duration-200 md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="px-5 py-6 flex items-center gap-3 border-b border-white/10">
        <div className="relative w-11 h-11 rounded-xl bg-white/10 p-1">
          <Image
            src="/logo.png"
            alt="ZooLogic Logo"
            fill
            sizes="40px"
            className="object-contain"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight">ZooLogic</span>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">vida em equilíbrio</p>
        </div>
      </div>
      
      <nav className="mt-7 px-3 space-y-1">
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={index}
            icon={item.icon}
            text={item.text}
            href={item.href}
          />
        ))}
      </nav>
      
      <div className="mt-auto mb-5 px-3 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => { clearAuthSession(); router.replace('/login') }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-white/70 transition hover:bg-white/10"
        >
          <FaSignOutAlt size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
} 
