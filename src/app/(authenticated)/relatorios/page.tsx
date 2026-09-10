'use client'

import { useEffect, useMemo, useState } from 'react'
import { FaDownload, FaFileAlt } from 'react-icons/fa'
import { animaisService, veterinariosService } from '@/services/api'
import { Animal } from '@/types/animal'
import { Veterinario } from '@/types/veterinario'

const csvEscape = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`

export default function RelatoriosPage() {
  const [animais, setAnimais] = useState<Animal[]>([])
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([])
  const [status, setStatus] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([animaisService.listar(), veterinariosService.listar()])
      .then(([animals, vets]) => { setAnimais(animals); setVeterinarios(vets) })
      .catch((err) => setError(err instanceof Error ? err.message : 'Não foi possível carregar o relatório.'))
      .finally(() => setLoading(false))
  }, [])

  const filteredAnimals = useMemo(() => status === 'Todos' ? animais : animais.filter(animal => animal.status === status), [animais, status])
  const healthy = animais.filter(animal => animal.status === 'Saudável').length
  const treatment = animais.filter(animal => animal.status === 'Em Tratamento').length
  const critical = animais.filter(animal => animal.status === 'Crítico').length

  const downloadCsv = () => {
    const header = ['Nome', 'Tipo', 'Espécie', 'Status', 'Setor', 'Habitat', 'Idade', 'Peso (kg)']
    const rows = filteredAnimals.map(animal => [animal.nome, animal.tipo, animal.especie, animal.status, animal.setor, animal.habitat, animal.idade, animal.peso])
    const csv = [header, ...rows].map(row => row.map(csvEscape).join(';')).join('\n')
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a'); link.href = url; link.download = 'relatorio-animais.csv'; link.click(); URL.revokeObjectURL(url)
  }

  return <div className="space-y-6">
    <header className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-zoo-forest">Visão operacional</p><h1 className="text-2xl font-bold text-zoo-forest">Relatórios</h1><p className="mt-1 text-sm text-zoo-muted">Acompanhe a situação atual do plantel e da equipe clínica.</p></div><button onClick={downloadCsv} disabled={loading || filteredAnimals.length === 0} className="inline-flex items-center gap-2 rounded-xl bg-zoo-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-zoo-forest/90 disabled:opacity-50"><FaDownload />Exportar animais</button></header>
    {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Animais cadastrados', animais.length], ['Saudáveis', healthy], ['Em tratamento', treatment], ['Críticos', critical]].map(([label, value]) => <div key={String(label)} className="zoo-surface rounded-2xl p-5 shadow-sm"><p className="text-sm text-zoo-muted">{label}</p><p className="mt-2 text-3xl font-bold text-zoo-forest">{loading ? '—' : value}</p></div>)}</div>
    <section className="zoo-surface rounded-2xl p-5 shadow-sm md:p-6"><div className="mb-5 flex items-center gap-3"><div className="rounded-xl bg-zoo-mist p-3 text-zoo-forest"><FaFileAlt /></div><div><h2 className="font-semibold text-zoo-forest">Relatório de animais</h2><p className="text-sm text-zoo-muted">Filtre os registros e exporte os dados para análise.</p></div></div><label className="block max-w-xs text-sm font-medium text-zoo-ink">Status<select value={status} onChange={event => setStatus(event.target.value)} className="mt-1 w-full rounded-xl border border-zoo-border bg-white px-3 py-2.5 text-sm"><option>Todos</option><option>Saudável</option><option>Em Tratamento</option><option>Crítico</option></select></label><div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-zoo-border text-xs uppercase tracking-wider text-zoo-muted"><tr><th className="px-3 py-3">Animal</th><th className="px-3 py-3">Espécie</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Setor</th></tr></thead><tbody className="divide-y divide-zoo-border">{loading ? <tr><td colSpan={4} className="px-3 py-6 text-zoo-muted">Carregando relatório...</td></tr> : filteredAnimals.length === 0 ? <tr><td colSpan={4} className="px-3 py-6 text-zoo-muted">Nenhum animal encontrado.</td></tr> : filteredAnimals.map(animal => <tr key={animal.id_animal}><td className="px-3 py-3 font-medium text-zoo-ink">{animal.nome}</td><td className="px-3 py-3 text-zoo-muted">{animal.especie}</td><td className="px-3 py-3 text-zoo-muted">{animal.status}</td><td className="px-3 py-3 text-zoo-muted">{animal.setor}</td></tr>)}</tbody></table></div></section>
    <div className="text-sm text-zoo-muted">Equipe clínica cadastrada: <span className="font-semibold text-zoo-forest">{loading ? '—' : veterinarios.length}</span> veterinário(s).</div>
  </div>
}
