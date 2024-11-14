'use client'
import { useEffect, useState } from 'react'
import { colaboradoresService } from '@/services/api'
import EntityNav from '@/components/layout/EntityNav'
import { Colaborador } from '@/types/colaborador'

// Para Colaboradores
const colaboradoresNavItems = [
  { name: 'Gerenciar', path: '' },
  { name: 'Delegar', path: '/delegar' },
  { name: 'Criar', path: '/criar' },
]

export default function GerenciarColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([])

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const data = await colaboradoresService.listar()
        setColaboradores(data)
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error)
      }
    }
    
    fetchColaboradores()
  }, [])

  return (
    <div>
      <EntityNav items={colaboradoresNavItems} basePath="/colaboradores" />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Implementar tabela ou lista de colaboradores */}
          {colaboradores.map((colab) => (
            <div key={colab.id} className="bg-white p-4 rounded-lg shadow mb-4">
              <h3>{colab.nome}</h3>
              <p>{colab.funcao}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 