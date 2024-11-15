export interface Colaborador {
  id: number;
  nome: string;
  funcao: string;
  setor?: string;
  email: string;
}

export type Setor = 'Mamíferos' | 'Aves' | 'Répteis' | 'Peixes' | 'Anfíbios'; 