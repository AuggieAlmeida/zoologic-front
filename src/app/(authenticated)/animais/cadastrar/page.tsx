'use client'
import { useEffect, useState } from 'react'
import EntityNav from '@/components/layout/EntityNav'
import { animaisService, habitatsService } from '@/services/api'
import { useRouter } from 'next/navigation'
import { TipoAlimentacao, StatusSaude, SetorAnimal, TipoAnimal } from '@/types/animal'
import { Habitat as HabitatCadastro } from '@/types/habitat'

const animaisNavItems = [
    { name: 'Gerenciar', path: '' },
    { name: 'Cadastrar', path: '/cadastrar' },
    { name: 'Monitoramento', path: '/monitoramento' },
]

export default function CadastrarAnimal() {
    const router = useRouter()
    const [editingId, setEditingId] = useState<number | null>(null)
    const [loadingAnimal, setLoadingAnimal] = useState(false)
    const [formError, setFormError] = useState('')
    const [saving, setSaving] = useState(false)
    const [habitatsCadastrados, setHabitatsCadastrados] = useState<HabitatCadastro[]>([])
    const [habitatsLoading, setHabitatsLoading] = useState(true)
    const [habitatsError, setHabitatsError] = useState(false)
    const [formData, setFormData] = useState({
        nome: '',
        especie: '',
        setor: '' as SetorAnimal,
        tipo: '' as TipoAnimal,
        habitat_id: '',
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
    useEffect(() => {
        habitatsService.listar()
            .then(setHabitatsCadastrados)
            .catch((error) => {
                console.error('Erro ao carregar habitats:', error)
                setHabitatsError(true)
            })
            .finally(() => setHabitatsLoading(false))
    }, [])

    useEffect(() => {
        const idParam = new URLSearchParams(window.location.search).get('editar')
        const id = idParam ? Number(idParam) : NaN
        if (!Number.isInteger(id) || id <= 0) return

        setEditingId(id)
        setLoadingAnimal(true)
        animaisService.buscar(id)
            .then((animal) => setFormData({
                nome: animal.nome,
                especie: animal.especie,
                setor: animal.setor,
                tipo: animal.tipo,
                habitat_id: String(animal.habitat_id),
                idade: String(animal.idade),
                peso: String(animal.peso),
                alimentacao: animal.alimentacao,
                status: animal.status,
                sexo: animal.sexo,
                observacoes: animal.observacoes ?? '',
                foto: animal.foto ?? '',
            }))
            .catch((error) => setFormError(error instanceof Error ? error.message : 'Não foi possível carregar o animal.'))
            .finally(() => setLoadingAnimal(false))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError('')
        setSaving(true)
        try {
            const dados = {
                ...formData,
                habitat_id: Number(formData.habitat_id),
                idade: Number(formData.idade),
                peso: Number(formData.peso),
            }
            if (editingId) {
                await animaisService.atualizar(editingId, dados)
            } else {
                await animaisService.criar(dados)
            }
            router.push('/animais')
        } catch (error) {
            console.error('Erro ao cadastrar animal:', error)
            setFormError(error instanceof Error ? error.message : 'Não foi possível salvar o animal.')
        } finally {
            setSaving(false)
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

            <div>
                <div className="max-w-4xl mx-auto zoo-surface rounded-2xl shadow-sm p-5 md:p-6">
                    <h2 className="text-xl font-semibold mb-2 text-zoo-forest">{editingId ? 'Editar animal' : 'Cadastrar animal'}</h2>
                    <p className="mb-6 text-sm text-zoo-muted">{editingId ? 'Atualize os dados do animal cadastrado.' : 'Adicione um novo animal ao plantel.'}</p>

                    {formError && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</p>}

                    {loadingAnimal ? (
                        <p className="py-8 text-center text-sm text-zoo-muted">Carregando dados do animal...</p>
                    ) : (

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
                                    name="habitat_id"
                                    value={formData.habitat_id}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    required
                                    disabled={habitatsLoading || habitatsError}
                                >
                                    <option value="">
                                        {habitatsLoading ? 'Carregando habitats...' : 'Selecione o habitat'}
                                    </option>
                                    {habitatsCadastrados.map((habitat) => (
                                        <option key={habitat.id} value={habitat.id}>{habitat.nome}</option>
                                    ))}
                                </select>
                                {habitatsError && (
                                    <p className="mt-1 text-sm text-red-600">Não foi possível carregar os habitats.</p>
                                )}
                                {!habitatsLoading && !habitatsError && habitatsCadastrados.length === 0 && (
                                    <p className="mt-1 text-sm text-amber-700">Cadastre um habitat antes de cadastrar um animal.</p>
                                )}
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
                                disabled={saving || habitatsLoading || habitatsError}
                                className="w-full bg-primary-green text-white rounded-md p-2 hover:bg-primary-green-dark"
                            >
                                {saving ? 'Salvando...' : editingId ? 'Salvar alterações' : 'Cadastrar'}
                            </button>
                        </div>
                    </form>
                    )}
                </div>
            </div>
        </div>
    )
}
