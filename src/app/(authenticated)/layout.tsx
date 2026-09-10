'use client'
import { useEffect } from 'react'
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

  return (
    <div className="flex h-screen bg-zoo-mist">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="px-4 py-5 md:px-6 md:py-6">
          {children}
        </main>
      </div>
    </div>
  )
} 
