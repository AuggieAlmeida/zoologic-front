'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaCheck, FaDesktop, FaMoon, FaPalette, FaSignOutAlt, FaSun } from 'react-icons/fa'
import { clearAuthSession } from '@/services/api'
import {
  applyTheme,
  getThemePreference,
  saveThemePreference,
  ThemePreference,
} from '@/services/theme'

const themeOptions: Array<{
  value: ThemePreference
  label: string
  description: string
  icon: typeof FaSun
}> = [
  { value: 'system', label: 'Usar configuração do dispositivo', description: 'A interface acompanha o tema definido no sistema operacional.', icon: FaDesktop },
  { value: 'light', label: 'Claro', description: 'Mantém a interface clara em todos os momentos.', icon: FaSun },
  { value: 'dark', label: 'Escuro', description: 'Usa uma paleta escura para ambientes com pouca luz.', icon: FaMoon },
]

export default function ConfiguracoesPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<ThemePreference>('system')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const preference = getThemePreference()
    setTheme(preference)
    applyTheme(preference)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveThemePreference(theme)
    setSaved(true)
  }

  const handleThemeChange = (preference: ThemePreference) => {
    setTheme(preference)
    setSaved(false)
    applyTheme(preference)
  }

  const handleLogout = () => {
    clearAuthSession()
    router.replace('/login')
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wider text-zoo-forest">Preferências do sistema</p>
        <h1 className="text-2xl font-bold text-zoo-forest">Configurações</h1>
        <p className="mt-1 text-sm text-zoo-muted">Ajuste a aparência do painel neste dispositivo.</p>
      </header>

      <section className="zoo-surface rounded-2xl p-5 shadow-sm md:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 rounded-xl bg-zoo-sage p-3 text-zoo-forest" aria-hidden="true">
            <FaPalette />
          </span>
          <div>
            <h2 className="font-semibold text-zoo-forest">Aparência</h2>
            <p className="mt-1 text-sm text-zoo-muted">Escolha como o ZooLogic deve ser exibido.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-zoo-ink">Tema da interface</legend>
            {themeOptions.map(({ value, label, description, icon: Icon }) => (
              <label
                key={value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${theme === value ? 'border-zoo-forest bg-zoo-sage/40' : 'border-zoo-border hover:bg-zoo-mist'}`}
              >
                <input
                  type="radio"
                  name="theme"
                  value={value}
                  checked={theme === value}
                  onChange={() => handleThemeChange(value)}
                  className="h-4 w-4 accent-zoo-forest"
                />
                <Icon className="shrink-0 text-zoo-forest" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-zoo-ink">{label}</span>
                  <span className="mt-0.5 block text-sm text-zoo-muted">{description}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-zoo-forest px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zoo-forest-soft">
              <FaCheck aria-hidden="true" />
              Salvar preferência
            </button>
            {saved && <p role="status" className="text-sm font-medium text-zoo-forest">Preferência salva neste dispositivo.</p>}
          </div>
        </form>
      </section>

      <section className="zoo-surface rounded-2xl p-5 shadow-sm md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-zoo-forest">Sessão</h2>
            <p className="mt-1 text-sm text-zoo-muted">Encerre o acesso neste navegador.</p>
          </div>
          <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-zoo-border px-4 py-2.5 text-sm font-semibold text-zoo-forest transition hover:bg-zoo-mist">
            <FaSignOutAlt aria-hidden="true" />
            Sair da conta
          </button>
        </div>
      </section>
    </div>
  )
}
