'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { applyTheme, getThemePreference, saveThemePreference } from '@/services/theme'

export default function Header() {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    applyTheme(getThemePreference())
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const nextDark = !dark
    saveThemePreference(nextDark ? 'dark' : 'light')
    setDark(nextDark)
  }
  
  const getTitleFromPath = () => {
    switch(pathname) {
      case '/dashboard':
        return 'Dashboard'
      case '/animais':
        return 'Animais'
      case '/animais/cadastrar':
        return 'Animais'
      case '/animais/monitoramento':
        return 'Animais'
      case '/colaboradores' :
        return 'Colaboradores'
      case '/colaboradores/criar':
        return 'Colaboradores'
      case '/colaboradores/delegar':
        return 'Colaboradores'
      case '/veterinarios':
        return 'Veterinários'
      case '/relatorios':
        return 'Relatórios'
      case '/habitats':
        return 'Habitats'
      case '/configuracoes':
        return 'Configurações'
      default:
        return 'Dashboard'
    }
  }

  return (
    <header className="bg-zoo-cream border-b border-zoo-sage/70 px-6 py-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zoo-forest/50">Painel de gestão</p>
          <h1 className="text-2xl font-semibold font-lemon text-zoo-forest">{getTitleFromPath()}</h1>
        </div>
        <button type="button" onClick={toggleTheme} aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'} title={dark ? 'Modo claro' : 'Modo escuro'} className="rounded-xl border border-zoo-border p-2.5 text-zoo-forest transition hover:bg-zoo-mist">
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  )
} 
