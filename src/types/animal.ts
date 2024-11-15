export type TipoAlimentacao = 'Carnívoro' | 'Herbívoro' | 'Onívoro';
export type StatusSaude = 'Saudável' | 'Em Tratamento' | 'Crítico';
export type SetorAnimal = 'Aquático' | 'Terrestre' | 'Misto';
export type TipoAnimal = 'Mamífero' | 'Ave' | 'Réptil' | 'Anfíbio' | 'Peixe';
export type Habitat = 
  | 'Floresta'
  | 'Savanas'
  | 'Desertos quentes'
  | 'Tundra ártica'
  | 'Montanhas'
  | 'Pradarias'
  | 'Rios e córregos'
  | 'Lagos e lagoas'
  | 'Pântanos'
  | 'Recifes de coral'
  | 'Manguezais'
  | 'Costas rochosas e praias'
  | 'Cavernas';

export interface Animal {
  id_animal: number;
  nome: string;
  tipo: TipoAnimal;
  especie: string;
  setor: SetorAnimal;
  habitat: Habitat;
  idade: number;
  peso: number;
  alimentacao: TipoAlimentacao;
  status: StatusSaude;
  sexo: 'M' | 'F';
  observacoes?: string;
  foto?: string;
} 