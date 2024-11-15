'use client'
import { useState } from 'react'
import EntityNav from '@/components/layout/EntityNav'
import { animaisService } from '@/services/api'
import { useRouter } from 'next/navigation'
import { TipoAlimentacao, StatusSaude, SetorAnimal, TipoAnimal, Habitat } from '@/types/animal'

const animaisNavItems = [
    { name: 'Gerenciar', path: '' },
    { name: 'Cadastrar', path: '/cadastrar' },
    { name: 'Monitoramento', path: '/monitoramento' },
]

export default function CadastrarAnimal() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        nome: '',
        especie: '',
        setor: '' as SetorAnimal,
        tipo: '' as TipoAnimal,
        habitat: '' as Habitat,
        idade: '',
        peso: '',
        alimentacao: '' as TipoAlimentacao,
        status: '' as StatusSaude,
        sexo: '' as 'M' | 'F',
        observacoes: '',
        foto: '',
    })

    const setores: SetorAnimal[] = ['Aquático', 'Terrestre', 'Misto']
    const tiposAlimentacao: TipoAlimentacao[] = ['Carnívoro', 'Herbívoro', 'Onívoro']
    const statusSaude: StatusSaude[] = ['Saudável', 'Em Tratamento', 'Crítico']
    const tiposAnimal: TipoAnimal[] = ['Mamífero', 'Ave', 'Réptil', 'Anfíbio', 'Peixe']
    const habitats: Habitat[] = [
        'Floresta',
        'Savanas',
        'Desertos quentes',
        'Tundra ártica',
        'Montanhas',
        'Pradarias',
        'Rios e córregos',
        'Lagos e lagoas',
        'Pântanos',
        'Recifes de coral',
        'Manguezais',
        'Costas rochosas e praias',
        'Cavernas'
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await animaisService.criar({
                ...formData,
                idade: Number(formData.idade),
                peso: Number(formData.peso),
            })
            router.push('/animais')
        } catch (error) {
            console.error('Erro ao cadastrar animal:', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <EntityNav items={animaisNavItems} basePath="/animais" />

            <div className="p-6">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-6">Cadastrar Animal</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
                                    Tipo
                                </label>
                                <select
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                >
                                    <option value="">Selecione o tipo de animal</option>
                                    {tiposAnimal.map((tipo) => (
                                        <option key={tipo} value={tipo}>{tipo}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Espécie
                                </label>
                                <input
                                    type="text"
                                    name="especie"
                                    value={formData.especie}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Setor
                                </label>
                                <select
                                    name="setor"
                                    value={formData.setor}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                >
                                    <option value="">Selecione o setor</option>
                                    {setores.map((setor) => (
                                        <option key={setor} value={setor}>{setor}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Habitat
                                </label>
                                <select
                                    name="habitat"
                                    value={formData.habitat}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                >
                                    <option value="">Selecione o habitat</option>
                                    {habitats.map((habitat) => (
                                        <option key={habitat} value={habitat}>{habitat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Idade
                                </label>
                                <input
                                    type="number"
                                    name="idade"
                                    value={formData.idade}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Peso (kg)
                                </label>
                                <input
                                    type="number"
                                    name="peso"
                                    value={formData.peso}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alimentação
                                </label>
                                <select
                                    name="alimentacao"
                                    value={formData.alimentacao}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                >
                                    <option value="">Selecione o tipo de alimentação</option>
                                    {tiposAlimentacao.map((tipo) => (
                                        <option key={tipo} value={tipo}>{tipo}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                >
                                    <option value="">Selecione o status</option>
                                    {statusSaude.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sexo
                                </label>
                                <select
                                    name="sexo"
                                    value={formData.sexo}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                >
                                    <option value="">Selecione o sexo</option>
                                    <option value="M">Macho</option>
                                    <option value="F">Fêmea</option>
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Observações
                                </label>
                                <textarea
                                    name="observacoes"
                                    value={formData.observacoes}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    rows={3}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Foto (URL)
                                </label>
                                <input
                                    type="url"
                                    name="foto"
                                    value={formData.foto}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="http://exemplo.com/foto.jpg"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-primary-green text-white rounded-md p-2 hover:bg-primary-green-dark"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}