'use client'
import EntityNav from '@/components/layout/EntityNav'
import { useState, useEffect } from 'react'
import { colaboradoresService } from '@/services/api'
import { useRouter } from 'next/navigation'
import { Colaborador, Setor } from '@/types/colaborador'

const colaboradoresNavItems = [
  { name: 'Gerenciar', path: '' },
  { name: 'Delegar', path: '/delegar' },
  { name: 'Criar', path: '/criar' },
]

export default function DelegarColaboradores() {
  const router = useRouter()
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedColaborador, setSelectedColaborador] = useState('')
  const [selectedSetor, setSelectedSetor] = useState<Setor | ''>('')

  const setores: Setor[] = [
    'RH',
    'Financeiro',
    'Comercial',
    'Operacional',
    'TI'
  ]

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await colaboradoresService.listar()
        setColaboradores(data)
      } catch (error) {
        setError('Não foi possível carregar os colaboradores. Tente novamente mais tarde.')
        console.error('Erro ao buscar colaboradores:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchColaboradores()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      await colaboradoresService.delegar(
        Number(selectedColaborador),
        selectedSetor
      )
      router.push('/colaboradores')
    } catch (error) {
      setError('Não foi possível delegar o colaborador. Tente novamente mais tarde.')
      console.error('Erro ao delegar colaborador:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 text-red-600 hover:text-red-800"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <EntityNav items={colaboradoresNavItems} basePath="/colaboradores" />
      
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Delegar Colaborador</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seleção de Colaborador */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecione o Colaborador
              </label>
              <select
                value={selectedColaborador}
                onChange={(e) => setSelectedColaborador(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Selecione...</option>
                {colaboradores.map((colab) => (
                  <option key={colab.id} value={colab.id}>
                    {colab.nome} - {colab.funcao}
                  </option>
                ))}
              </select>
            </div>

            {/* Seleção de Setor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Novo Setor
              </label>
              <select
                value={selectedSetor}
                onChange={(e) => setSelectedSetor(e.target.value as Setor)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Selecione...</option>
                {setores.map((setor) => (
                  <option key={setor} value={setor}>
                    {setor}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão de Submit */}
            <button
              type="submit"
              disabled={!selectedColaborador || !selectedSetor}
              className="w-full bg-primary-green text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar Delegação
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 