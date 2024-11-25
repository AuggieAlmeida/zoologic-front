import Image from 'next/image'
import { FaHome, FaPaw, FaUserMd, FaWarehouse, FaUsers, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa'
import SidebarItem from './SidebarItem'

export default function Sidebar() {
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
    <div className="w-64 bg-primary-green text-white h-screen flex flex-col">
      <div className="p-4 flex items-center gap-2">
        <div className="relative w-10 h-10">
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
        <span className="text-xl font-bold">ZooLogic</span>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={index}
            icon={item.icon}
            text={item.text}
            href={item.href}
          />
        ))}
      </nav>
      
      <div className="mt-auto mb-4">
        <SidebarItem 
          icon={<FaSignOutAlt size={20} />}
          text="Sair"
          href="/login"
        />
      </div>
    </div>
  )
} 