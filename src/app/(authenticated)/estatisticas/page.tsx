'use client'

import { useEffect, useMemo, useState } from 'react'
import ChartCard from '@/components/dashboard/ChartCard'
import PieChart from '@/components/charts/PieChart'
import { animaisService, habitatsService, veterinariosService } from '@/services/api'
import { Animal } from '@/types/animal'
import { Habitat } from '@/types/habitat'

const palette = ['#D6A84F', '#80A889', '#5B8C85', '#C47B5B', '#A7B6A0', '#6E8F86']

function distribution(values: string[]) {
  const counts = new Map<string, number>()
  values.forEach(value => counts.set(value, (counts.get(value) ?? 0) + 1))
  const labels = [...counts.keys()].sort((a, b) => a.localeCompare(b, 'pt-BR'))
  return {
    labels,
    datasets: [{
      data: labels.map(label => counts.get(label) ?? 0),
      backgroundColor: labels.map((_, index) => palette[index % palette.length]),
      borderWidth: 1,
      borderColor: '#FFFFFF',
    }],
  }
}

export default function EstatisticasPage() {
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
      .catch(err => setError(err instanceof Error ? err.message : 'Não foi possível carregar as estatísticas.'))
      .finally(() => setLoading(false))
  }, [])

  const health = useMemo(() => ({
    healthy: animais.filter(animal => animal.status === 'Saudável').length,
    treatment: animais.filter(animal => animal.status === 'Em Tratamento').length,
    critical: animais.filter(animal => animal.status === 'Crítico').length,
  }), [animais])

  const capacity = useMemo(() => habitats.reduce((total, habitat) => total + habitat.capacidade, 0), [habitats])
  const occupancy = useMemo(() => animais.filter(animal => habitats.some(habitat => habitat.id === animal.habitat_id)).length, [animais, habitats])

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wider text-zoo-forest">Visão analítica</p>
        <h1 className="text-2xl font-bold text-zoo-forest">Estatísticas</h1>
        <p className="mt-1 text-sm text-zoo-muted">Indicadores calculados a partir dos registros atuais do zoológico.</p>
      </header>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Animais', animais.length],
          ['Veterinários', veterinarios],
          ['Habitats', habitats.length],
          ['Capacidade', capacity],
        ].map(([label, value]) => (
          <div key={String(label)} className="zoo-surface rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-zoo-muted">{label}</p>
            <p className="mt-2 text-3xl font-bold text-zoo-forest">{loading ? '—' : value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <ChartCard title="Saúde do plantel" bgColor="bg-zoo-forest">
          <PieChart data={{ labels: ['Saudável', 'Em Tratamento', 'Crítico'], datasets: [{ data: [health.healthy, health.treatment, health.critical], backgroundColor: ['#80A889', '#D6A84F', '#C47B5B'], borderWidth: 1, borderColor: '#FFFFFF' }] }} />
        </ChartCard>
        <ChartCard title="Distribuição por tipo" bgColor="bg-zoo-forest-soft">
          <PieChart data={distribution(animais.map(animal => animal.tipo))} />
        </ChartCard>
        <ChartCard title="Animais por setor" bgColor="bg-zoo-forest-soft">
          <PieChart data={distribution(animais.map(animal => animal.setor))} />
        </ChartCard>
        <ChartCard title="Animais por habitat" bgColor="bg-zoo-forest">
          <PieChart data={distribution(animais.map(animal => animal.habitat))} />
        </ChartCard>
      </div>

      <section className="zoo-surface rounded-2xl p-5 shadow-sm">
        <h2 className="font-semibold text-zoo-forest">Resumo de ocupação</h2>
        <div className="mt-4 flex flex-wrap gap-6 text-sm">
          <p><span className="text-zoo-muted">Animais vinculados a habitats:</span> <strong className="text-zoo-forest">{loading ? '—' : occupancy}</strong></p>
          <p><span className="text-zoo-muted">Vagas disponíveis:</span> <strong className="text-zoo-forest">{loading ? '—' : Math.max(capacity - occupancy, 0)}</strong></p>
        </div>
      </section>
    </div>
  )
}
