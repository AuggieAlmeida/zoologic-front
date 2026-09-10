export interface Veterinario {
  id: number
  nome: string
  email: string
  crmv: string
  especialidade: string | null
  telefone: string | null
}

export type VeterinarioInput = Omit<Veterinario, 'id'>
