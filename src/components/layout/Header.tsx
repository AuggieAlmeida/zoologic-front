import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  const getTitleFromPath = () => {
    switch(pathname) {
      case '/dashboard':
        return 'Dashboard'
      case '/animais':
        return 'Animais'
      case '/configuracoes':
        return 'Configurações'
      default:
        return 'Dashboard'
    }
  }

  return (
    <header className="bg-primary-green shadow p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold font-lemon text-white">{getTitleFromPath()}</h1>
      </div>
    </header>
  )
} 