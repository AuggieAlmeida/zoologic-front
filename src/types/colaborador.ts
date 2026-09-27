export interface Colaborador {
  id: number;
  nome: string;
  funcao: string;
  setor?: string;
  email: string;
  // MySQL DECIMAL arrives through PDO as a string such as "3500.00".
  salario: number | string;
}

export interface ColaboradorUpdate {
  nome: string;
  email: string;
  funcao: string;
  salario: number;
}

export type Setor = 'Mamíferos' | 'Aves' | 'Répteis' | 'Peixes' | 'Anfíbios'; 