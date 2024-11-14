export interface Colaborador {
  id: number;
  nome: string;
  funcao: string;
  setor?: string;
  email: string;
}

export type Setor = 'RH' | 'Financeiro' | 'Comercial' | 'Operacional' | 'TI'; 