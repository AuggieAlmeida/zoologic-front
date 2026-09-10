'use client'

import { FormEvent, useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaTrash, FaUserMd } from 'react-icons/fa'
import { veterinariosService } from '@/services/api'
import { Veterinario, VeterinarioInput } from '@/types/veterinario'

const emptyForm: VeterinarioInput = { nome: '', email: '', crmv: '', especialidade: '', telefone: '' }

export default function VeterinariosPage() {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([])
  const [form, setForm] = useState<VeterinarioInput>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const loadVeterinarios = async () => {
    try {
      setLoading(true)
      setError(null)
      setVeterinarios(await veterinariosService.listar())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível carregar os veterinários.')
    } finally { setLoading(false) }
  }

  useEffect(() => { loadVeterinarios() }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setSaving(true); setError(null); setNotice(null)
      if (editingId) await veterinariosService.atualizar(editingId, form)
      else await veterinariosService.criar(form)
      setForm(emptyForm); setEditingId(null)
      setNotice(editingId ? 'Veterinário atualizado.' : 'Veterinário cadastrado.')
      await loadVeterinarios()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o veterinário.')
    } finally { setSaving(false) }
  }

  const edit = (veterinario: Veterinario) => {
    setEditingId(veterinario.id)
    setForm({ nome: veterinario.nome, email: veterinario.email, crmv: veterinario.crmv, especialidade: veterinario.especialidade ?? '', telefone: veterinario.telefone ?? '' })
    setNotice(null)
  }

  const remove = async (id: number) => {
    if (!window.confirm('Excluir este veterinário?')) return
    try { await veterinariosService.excluir(id); setNotice('Veterinário excluído.'); await loadVeterinarios() }
    catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível excluir o veterinário.') }
  }

  return <div className="space-y-6">
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div><p className="text-sm font-semibold uppercase tracking-wider text-zoo-forest">Equipe clínica</p><h1 className="text-2xl font-bold text-zoo-forest">Veterinários</h1><p className="mt-1 text-sm text-zoo-muted">Gerencie os profissionais responsáveis pelo cuidado dos animais.</p></div>
      <div className="rounded-2xl bg-zoo-forest px-4 py-3 text-white"><FaUserMd className="mb-1 text-zoo-gold" /><span className="text-2xl font-bold">{veterinarios.length}</span><p className="text-xs text-white/70">cadastrados</p></div>
    </header>
    {(error || notice) && <div className={`rounded-xl border px-4 py-3 text-sm ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>{error ?? notice}</div>}
    <section className="zoo-surface rounded-2xl p-5 shadow-sm md:p-6">
      <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-semibold text-zoo-forest">{editingId ? 'Editar veterinário' : 'Novo veterinário'}</h2>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }} className="text-sm text-zoo-muted hover:text-zoo-forest">Cancelar edição</button>}</div>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        {([['nome','Nome completo','text'],['email','E-mail','email'],['crmv','CRMV','text'],['especialidade','Especialidade','text'],['telefone','Telefone','tel']] as const).map(([name, label, type]) => <label key={name} className="text-sm font-medium text-zoo-ink">{label}<input required={name !== 'especialidade' && name !== 'telefone'} type={type} value={form[name] ?? ''} onChange={e => setForm({ ...form, [name]: e.target.value })} className="mt-1 w-full rounded-xl border border-zoo-border bg-white px-3 py-2.5 outline-none transition focus:border-zoo-sage focus:ring-2 focus:ring-zoo-sage/20" /></label>)}
        <button disabled={saving} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-zoo-forest px-4 py-2.5 font-semibold text-white transition hover:bg-zoo-forest/90 disabled:cursor-not-allowed disabled:opacity-60"><FaPlus />{saving ? 'Salvando...' : editingId ? 'Salvar alterações' : 'Cadastrar veterinário'}</button>
      </form>
    </section>
    <section className="zoo-surface overflow-hidden rounded-2xl shadow-sm"><div className="border-b border-zoo-border px-5 py-4"><h2 className="font-semibold text-zoo-forest">Profissionais cadastrados</h2></div>{loading ? <p className="p-6 text-sm text-zoo-muted">Carregando veterinários...</p> : veterinarios.length === 0 ? <p className="p-6 text-sm text-zoo-muted">Nenhum veterinário cadastrado ainda.</p> : <div className="divide-y divide-zoo-border">{veterinarios.map(v => <div key={v.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"><div><h3 className="font-semibold text-zoo-ink">{v.nome}</h3><p className="text-sm text-zoo-muted">CRMV {v.crmv} · {v.especialidade || 'Especialidade não informada'}</p><p className="text-sm text-zoo-muted">{v.email}{v.telefone ? ` · ${v.telefone}` : ''}</p></div><div className="flex gap-2"><button onClick={() => edit(v)} aria-label={`Editar ${v.nome}`} className="rounded-lg p-2 text-zoo-forest hover:bg-zoo-mist"><FaEdit /></button><button onClick={() => remove(v.id)} aria-label={`Excluir ${v.nome}`} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><FaTrash /></button></div></div>)}</div>}</section>
  </div>
}
