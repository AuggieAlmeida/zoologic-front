import Image from 'next/image'
import { FaHome, FaPaw, FaUserMd, FaWarehouse, FaUsers, FaClipboardList, FaChartBar, FaCog } from 'react-icons/fa'
import SidebarItem from './SidebarItem'

export default function Sidebar() {
  const menuItems = [
    { icon: <FaHome size={20} />, text: "Dashboard", href: "/dashboard" },
    { icon: <FaPaw size={20} />, text: "Animais", href: "/animais" },
    { icon: <FaUserMd size={20} />, text: "Veterinários", href: "/veterinarios" },
    { icon: <FaWarehouse size={20} />, text: "Habitats", href: "/habitats" },
    { icon: <FaUsers size={20} />, text: "Colaboradores", href: "/colaboradores" },
    { icon: <FaClipboardList size={20} />, text: "Relatórios", href: "/relatorios" },
    { icon: <FaChartBar size={20} />, text: "Estatísticas", href: "/estatisticas" },
    { icon: <FaCog size={20} />, text: "Configurações", href: "/configuracoes" }
  ]

  return (
    <div className="w-64 bg-primary-green text-white">
      <div className="p-4 flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="ZooLogic Logo"
          width={40}
          height={40}
        />
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
    </div>
  )
} 