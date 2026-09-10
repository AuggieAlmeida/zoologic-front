export interface Habitat { id: number; nome: string; tipo: string; capacidade: number; localizacao: string; descricao?: string }
export type HabitatInput = Omit<Habitat, 'id'>
