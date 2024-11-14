'use client'
import { useState } from 'react'
import StatusCard from '@/components/dashboard/StatusCard'
import ChartCard from '@/components/dashboard/ChartCard'
import PieChart from '@/components/charts/PieChart'
import { 
  statusCards, 
  animalHabitatData, 
  animalSetorData, 
  funcHabitatData, 
  funcSetorData 
} from '@/data/dashboardData'

export default function Dashboard() {
  const [period, setPeriod] = useState('30')

  return (
    <>
      {/* Period Filter */}
      <div className="flex justify-start mb-6">
        <select 
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border p-2 rounded bg-white"
        >
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
        </select>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {statusCards.map((card, index) => (
          <StatusCard
            key={index}
            title={card.title}
            count={card.count}
            color={card.color}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Distribuição por Habitat" bgColor="bg-primary-green">
          <PieChart data={animalHabitatData} />
        </ChartCard>
        <ChartCard title="Ocupação por Tipo" bgColor="bg-secondary-green">
          <PieChart data={animalSetorData} />
        </ChartCard>
        <ChartCard title="Funcionários por Habitat" bgColor="bg-secondary-green">
          <PieChart data={funcHabitatData} />
        </ChartCard>
        <ChartCard title="Funcionários por Tipo" bgColor="bg-primary-green">
          <PieChart data={funcSetorData} />
        </ChartCard>
      </div>
    </>
  )
}
