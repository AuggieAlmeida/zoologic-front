'use client'
import { useState } from 'react'
import EntityNav from '@/components/layout/EntityNav'
import { colaboradoresService } from '@/services/api'
import { useRouter } from 'next/navigation'

const colaboradoresNavItems = [
  { name: 'Gerenciar', path: '' },
  { name: 'Delegar', path: '/delegar' },
  { name: 'Criar', path: '/criar' },
]

export default function CriarColaborador() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    funcao: '',
    salario: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await colaboradoresService.criar({
        ...formData,
        salario: Number(formData.salario)
      })
      router.push('/colaboradores')
    } catch (error) {
      console.error('Erro ao criar colaborador:', error)
      // Implementar tratamento de erro adequado
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <EntityNav items={colaboradoresNavItems} basePath="/colaboradores" />
      
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Criar Colaborador</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Função
              </label>
              <input
                type="text"
                name="funcao"
                value={formData.funcao}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salário
              </label>
              <input
                type="number"
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-green text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Criar Colaborador
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 