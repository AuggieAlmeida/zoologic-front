'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { getAuthToken } from '@/services/api'
import { applyTheme, getThemePreference } from '@/services/theme'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const syncTheme = () => applyTheme(getThemePreference())
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    syncTheme()
    mediaQuery.addEventListener('change', syncTheme)

    return () => mediaQuery.removeEventListener('change', syncTheme)
  }, [])

  useEffect(() => {
    if (!getAuthToken()) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
  }, [pathname, router])

  // Navigating from the mobile drawer should reveal the page, not leave the menu over it.
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <div className="flex h-screen bg-zoo-mist">
      <Sidebar open={menuOpen} />
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
      <div className="min-w-0 flex-1 overflow-auto">
        <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(open => !open)} />
        <main className="px-4 py-5 md:px-6 md:py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
