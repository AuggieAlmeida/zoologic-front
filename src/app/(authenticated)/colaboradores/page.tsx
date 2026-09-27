'use client'
import { FormEvent, useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { colaboradoresService } from '@/services/api'
import EntityNav from '@/components/layout/EntityNav'
import { Colaborador, ColaboradorUpdate } from '@/types/colaborador'

const colaboradoresNavItems = [
  { name: 'Gerenciar', path: '' },
  { name: 'Delegar', path: '/delegar' },
  { name: 'Criar', path: '/criar' },
]

const emptyForm: ColaboradorUpdate = { nome: '', email: '', funcao: '', salario: 0 }

const formatSalario = (value: number | string) =>
  Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function GerenciarColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
  const [form, setForm] = useState<ColaboradorUpdate>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const loadColaboradores = async () => {
    try {
      setLoading(true)
      setError(null)
      setColaboradores(await colaboradoresService.listar())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar os colaboradores.')
    } finally { setLoading(false) }
  }

  useEffect(() => { loadColaboradores() }, [])

  const edit = (colaborador: Colaborador) => {
    setEditingId(colaborador.id)
    setForm({ nome: colaborador.nome, email: colaborador.email, funcao: colaborador.funcao, salario: Number(colaborador.salario) })
    setNotice(null)
  }

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm) }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!editingId) return
    try {
      setSaving(true); setError(null); setNotice(null)
      await colaboradoresService.atualizar(editingId, form)
      cancelEdit()
      setNotice('Colaborador atualizado.')
      await loadColaboradores()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o colaborador.')
    } finally { setSaving(false) }
  }

  const remove = async (colaborador: Colaborador) => {
    if (!window.confirm(`Excluir ${colaborador.nome}?`)) return
    try {
      await colaboradoresService.excluir(colaborador.id)
      if (editingId === colaborador.id) cancelEdit()
      setNotice('Colaborador excluído.')
      await loadColaboradores()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível excluir o colaborador.')
    }
  }

  const inputClass = 'mt-1 w-full rounded-xl border border-zoo-border bg-white px-3 py-2.5 outline-none transition focus:border-zoo-sage focus:ring-2 focus:ring-zoo-sage/20'

  return (
    <div>
      <EntityNav items={colaboradoresNavItems} basePath="/colaboradores" />
      <div className="mx-auto max-w-4xl space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-zoo-forest">Equipe</p>
          <h2 className="text-xl font-bold text-zoo-forest">Colaboradores</h2>
          <p className="mt-1 text-sm text-zoo-muted">Consulte a equipe, ajuste dados cadastrais e remova quem saiu.</p>
        </header>

        {(error || notice) && <div className={`rounded-xl border px-4 py-3 text-sm ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>{error ?? notice}</div>}

        {editingId && (
          <section className="zoo-surface rounded-2xl p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zoo-forest">Editar colaborador</h3>
              <button type="button" onClick={cancelEdit} className="text-sm text-zoo-muted hover:text-zoo-forest">Cancelar edição</button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-zoo-ink">Nome
                <input required value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-zoo-ink">E-mail
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-zoo-ink">Função
                <input required value={form.funcao} onChange={e => setForm({ ...form, funcao: e.target.value })} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-zoo-ink">Salário (R$)
                <input required type="number" min="0" step="0.01" value={form.salario} onChange={e => setForm({ ...form, salario: Number(e.target.value) })} className={inputClass} />
              </label>
              <button disabled={saving} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-zoo-forest px-4 py-2.5 font-semibold text-white transition hover:bg-zoo-forest/90 disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </form>
          </section>
        )}

        <section className="zoo-surface overflow-hidden rounded-2xl shadow-sm">
          <div className="border-b border-zoo-border px-5 py-4"><h3 className="font-semibold text-zoo-forest">Equipe cadastrada</h3></div>
          {loading ? <p className="p-6 text-sm text-zoo-muted">Carregando colaboradores...</p>
            : colaboradores.length === 0 ? <p className="p-6 text-sm text-zoo-muted">Nenhum colaborador cadastrado ainda. Use a aba Criar para adicionar o primeiro.</p>
            : <div className="divide-y divide-zoo-border">
              {colaboradores.map(c => (
                <div key={c.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <h4 className="font-semibold text-zoo-ink">{c.nome}</h4>
                    <p className="text-sm text-zoo-muted">{c.funcao} · {c.setor || 'Sem setor delegado'} · {formatSalario(c.salario)}</p>
                    <p className="text-sm text-zoo-muted">{c.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => edit(c)} aria-label={`Editar ${c.nome}`} className="rounded-lg p-2 text-zoo-forest hover:bg-zoo-mist"><FaEdit /></button>
                    <button onClick={() => remove(c)} aria-label={`Excluir ${c.nome}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>}
        </section>
      </div>
    </div>
  )
}
