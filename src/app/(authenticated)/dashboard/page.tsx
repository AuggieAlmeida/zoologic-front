'use client'
import { useEffect, useMemo, useState } from 'react'
import StatusCard from '@/components/dashboard/StatusCard'
import ChartCard from '@/components/dashboard/ChartCard'
import PieChart from '@/components/charts/PieChart'
import { animaisService, habitatsService, veterinariosService } from '@/services/api'
import { Animal } from '@/types/animal'
import { Habitat } from '@/types/habitat'

export default function Dashboard() {
  const [animais, setAnimais] = useState<Animal[]>([])
  const [habitats, setHabitats] = useState<Habitat[]>([])
  const [veterinarios, setVeterinarios] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([animaisService.listar(), habitatsService.listar(), veterinariosService.listar()])
      .then(([animals, registeredHabitats, vets]) => {
        setAnimais(animals)
        setHabitats(registeredHabitats)
        setVeterinarios(vets.length)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Não foi possível carregar a dashboard.'))
      .finally(() => setLoading(false))
  }, [])

  const distribution = (key: keyof Animal) => {
    const counts = new Map<string, number>()
    animais.forEach(animal => { const value = String(animal[key]); counts.set(value, (counts.get(value) ?? 0) + 1) })
    const labels = [...counts.keys()]
    return { labels, datasets: [{ data: labels.map(label => counts.get(label) ?? 0), backgroundColor: ['#D6A84F', '#80A889', '#5B8C85', '#C47B5B', '#A7B6A0'], borderWidth: 1, borderColor: '#FFFFFF' }] }
  }

  const statusCounts = useMemo(() => ({ healthy: animais.filter(a => a.status === 'Saudável').length, treatment: animais.filter(a => a.status === 'Em Tratamento').length, critical: animais.filter(a => a.status === 'Crítico').length }), [animais])
  const statusData = useMemo(() => ({ labels: ['Saudável', 'Em Tratamento', 'Crítico'], datasets: [{ data: [statusCounts.healthy, statusCounts.treatment, statusCounts.critical], backgroundColor: ['#80A889', '#D6A84F', '#C47B5B'], borderWidth: 1, borderColor: '#FFFFFF' }] }), [statusCounts])
  const capacitySummary = useMemo(() => {
    const capacity = habitats.reduce((total, habitat) => total + habitat.capacidade, 0)
    const occupied = animais.filter(animal => habitats.some(habitat => habitat.id === animal.habitat_id)).length
    return { capacity, occupied, available: Math.max(capacity - occupied, 0) }
  }, [animais, habitats])

  return (
    <>
      {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { title: 'ANIMAIS CADASTRADOS', count: animais.length, color: 'bg-primary-green' },
          { title: 'SAUDÁVEIS', count: statusCounts.healthy, color: 'bg-secondary-green' },
          { title: 'EM TRATAMENTO', count: statusCounts.treatment, color: 'bg-primary-green' },
          { title: 'VETERINÁRIOS', count: veterinarios, color: 'bg-secondary-green' },
        ].map((card, index) => (
          <StatusCard
            key={index}
            title={card.title}
            count={loading ? 0 : card.count}
            color={card.color}
          />
        ))}
      </div>

      <section className="zoo-surface mb-6 rounded-2xl p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-zoo-forest">Ocupação dos habitats</h2>
            <p className="mt-1 text-sm text-zoo-muted">Resumo calculado com os habitats e animais cadastrados.</p>
          </div>
          <span className="rounded-full bg-zoo-mist px-3 py-1 text-sm font-medium text-zoo-forest">{habitats.length} cadastrados</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zoo-border px-4 py-3"><p className="text-sm text-zoo-muted">Capacidade total</p><p className="mt-1 text-2xl font-bold text-zoo-forest">{loading ? '—' : capacitySummary.capacity}</p></div>
          <div className="rounded-xl border border-zoo-border px-4 py-3"><p className="text-sm text-zoo-muted">Animais vinculados</p><p className="mt-1 text-2xl font-bold text-zoo-forest">{loading ? '—' : capacitySummary.occupied}</p></div>
          <div className="rounded-xl border border-zoo-border px-4 py-3"><p className="text-sm text-zoo-muted">Vagas disponíveis</p><p className="mt-1 text-2xl font-bold text-zoo-forest">{loading ? '—' : capacitySummary.available}</p></div>
        </div>
      </section>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Distribuição por Habitat" bgColor="bg-primary-green">
          <PieChart data={distribution('habitat')} />
        </ChartCard>
        <ChartCard title="Ocupação por Setor" bgColor="bg-secondary-green">
          <PieChart data={distribution('setor')} />
        </ChartCard>
        <ChartCard title="Saúde do plantel" bgColor="bg-secondary-green">
          <PieChart data={statusData} />
        </ChartCard>
        <ChartCard title="Distribuição por tipo" bgColor="bg-primary-green">
          <PieChart data={distribution('tipo')} />
        </ChartCard>
      </div>
    </>
  )
}
