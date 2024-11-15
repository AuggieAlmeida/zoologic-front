'use client'
import { useEffect, useState } from 'react'
import EntityNav from '@/components/layout/EntityNav'
import { animaisService } from '@/services/api'
import { Animal, StatusSaude } from '@/types/animal'

const animaisNavItems = [
  { name: 'Gerenciar', path: '' },
  { name: 'Cadastrar', path: '/cadastrar' },
  { name: 'Monitoramento', path: '/monitoramento' },
]

export default function MonitoramentoAnimais() {
  const [animais, setAnimais] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        setLoading(true)
        const data = await animaisService.listar()
        setAnimais(data)
      } catch (error) {
        setError('Erro ao carregar animais. Tente novamente mais tarde.')
        console.error('Erro ao buscar animais:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAnimais()
  }, [])

  const handleStatusChange = async (id: number, novoStatus: StatusSaude) => {
    try {
      await animaisService.atualizar(id, { status: novoStatus })
      setAnimais(animais.map(animal => 
        animal.id_animal === id ? { ...animal, status: novoStatus } : animal
      ))
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
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
      <EntityNav items={animaisNavItems} basePath="/animais" />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {animais.map((animal) => (
              <div key={animal.id_animal} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{animal.nome}</h3>
                    <p className="text-sm text-gray-600">
                      {animal.tipo} - {animal.especie}
                    </p>
                  </div>
                  <select
                    value={animal.status}
                    onChange={(e) => handleStatusChange(animal.id_animal, e.target.value as StatusSaude)}
                    className={`text-sm rounded px-2 py-1 ${
                      animal.status === 'Saudável' ? 'bg-green-100 text-green-800' :
                      animal.status === 'Em Tratamento' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="Saudável">Saudável</option>
                    <option value="Em Tratamento">Em Tratamento</option>
                    <option value="Crítico">Crítico</option>
                  </select>
                </div>
                
                <div className="mt-2 text-sm">
                  <p>Setor: {animal.setor}</p>
                  <p>Peso: {animal.peso} kg</p>
                  <p>Idade: {animal.idade} anos</p>
                  <p>Sexo: {animal.sexo === 'M' ? 'Macho' : 'Fêmea'}</p>
                </div>

                {animal.foto && (
                  <img 
                    src={animal.foto} 
                    alt={`Foto de ${animal.nome}`}
                    className="mt-2 w-full h-32 object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 