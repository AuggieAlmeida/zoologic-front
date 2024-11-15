'use client'
import { useEffect, useState } from 'react'
import { animaisService } from '@/services/api'
import EntityNav from '@/components/layout/EntityNav'
import { Animal } from '@/types/animal'

const animaisNavItems = [
  { name: 'Gerenciar', path: '' },
  { name: 'Cadastrar', path: '/cadastrar' },
  { name: 'Monitoramento', path: '/monitoramento' },
]

export default function GerenciarAnimais() {
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
          {animais.map((animal) => (
            <div key={animal.id_animal} className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{animal.nome}</h3>
                  <p className="text-gray-600">
                    {animal.tipo} - {animal.especie}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  animal.status === 'Saudável' ? 'bg-green-100 text-green-800' :
                  animal.status === 'Em Tratamento' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {animal.status}
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Setor</p>
                  <p>{animal.setor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sexo</p>
                  <p>{animal.sexo === 'M' ? 'Macho' : 'Fêmea'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Idade</p>
                  <p>{animal.idade} anos</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Peso</p>
                  <p>{animal.peso} kg</p>
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm mr-2">
                  {animal.alimentacao}
                </span>
              </div>

              {animal.observacoes && (
                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-medium">Observações:</p>
                  <p>{animal.observacoes}</p>
                </div>
              )}

              {animal.foto && (
                <div className="mt-4">
                  <img 
                    src={animal.foto} 
                    alt={`Foto de ${animal.tipo}`} 
                    className="w-full max-w-xs rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 