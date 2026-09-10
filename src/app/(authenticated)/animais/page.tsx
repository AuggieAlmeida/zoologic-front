'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
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
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        setLoading(true)
        const data = await animaisService.listar()
        setAnimais(data)
      } catch (error) {
        setError(error instanceof Error && error.message === 'Autenticação necessária'
          ? 'Sua sessão expirou. Faça login novamente.'
          : 'Erro ao carregar animais. Tente novamente mais tarde.')
        console.error('Erro ao buscar animais:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAnimais()
  }, [])

  const handleDelete = async (animal: Animal) => {
    if (!window.confirm(`Excluir o animal ${animal.nome}?`)) return

    try {
      setDeletingId(animal.id_animal)
      setError(null)
      await animaisService.excluir(animal.id_animal)
      setAnimais((current) => current.filter((item) => item.id_animal !== animal.id_animal))
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Não foi possível excluir o animal.')
    } finally {
      setDeletingId(null)
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
      <div>
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
      <div>
        <div className="max-w-4xl mx-auto">
          {animais.length === 0 && (
            <div className="zoo-surface rounded-2xl p-6 text-center shadow-sm">
              <p className="text-zoo-muted">Nenhum animal cadastrado.</p>
              <Link href="/animais/cadastrar" className="mt-4 inline-flex rounded-xl bg-zoo-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-zoo-forest-soft">
                Cadastrar animal
              </Link>
            </div>
          )}

          {animais.map((animal) => (
            <div key={animal.id_animal} className="zoo-surface mb-4 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-zoo-ink">{animal.nome}</h3>
                  <p className="text-zoo-muted">
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
                  <p className="text-sm text-zoo-muted">Setor</p>
                  <p className="text-zoo-ink">{animal.setor}</p>
                </div>
                <div>
                  <p className="text-sm text-zoo-muted">Sexo</p>
                  <p className="text-zoo-ink">{animal.sexo === 'M' ? 'Macho' : 'Fêmea'}</p>
                </div>
                <div>
                  <p className="text-sm text-zoo-muted">Idade</p>
                  <p className="text-zoo-ink">{animal.idade} anos</p>
                </div>
                <div>
                  <p className="text-sm text-zoo-muted">Peso</p>
                  <p className="text-zoo-ink">{animal.peso} kg</p>
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-block rounded-full bg-zoo-sage px-3 py-1 text-sm text-zoo-ink mr-2">
                  {animal.alimentacao}
                </span>
              </div>

              {animal.observacoes && (
                <div className="mt-4 text-sm text-zoo-muted">
                  <p className="font-medium">Observações:</p>
                  <p>{animal.observacoes}</p>
                </div>
              )}

              {animal.foto && (
                <div className="mt-4">
                  <Image
                    src={animal.foto} 
                    alt={`Foto de ${animal.tipo}`} 
                    width={600}
                    height={320}
                    unoptimized
                    className="w-full max-w-xs rounded-lg"
                  />
                </div>
              )}

              <div className="mt-5 flex justify-end gap-2 border-t border-zoo-border pt-4">
                <Link
                  href={`/animais/cadastrar?editar=${animal.id_animal}`}
                  aria-label={`Editar ${animal.nome}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-zoo-border px-3 py-2 text-sm font-semibold text-zoo-forest hover:bg-zoo-mist"
                >
                  <FaEdit aria-hidden="true" />
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(animal)}
                  disabled={deletingId === animal.id_animal}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                >
                  <FaTrash aria-hidden="true" />
                  {deletingId === animal.id_animal ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
