export type TipoAlimentacao = 'Carnívoro' | 'Herbívoro' | 'Onívoro';
export type StatusSaude = 'Saudável' | 'Em Tratamento' | 'Crítico';
export type SetorAnimal = 'Aquático' | 'Terrestre' | 'Misto';
export type TipoAnimal = 'Mamífero' | 'Ave' | 'Réptil' | 'Anfíbio' | 'Peixe';
// Habitats são entidades cadastráveis na API, portanto o nome não é um enum fixo.
export type Habitat = string;

export interface Animal {
  id_animal: number;
  nome: string;
  tipo: TipoAnimal;
  especie: string;
  setor: SetorAnimal;
  habitat_id: number;
  habitat: Habitat;
  idade: number;
  peso: number;
  alimentacao: TipoAlimentacao;
  status: StatusSaude;
  sexo: 'M' | 'F';
  observacoes?: string;
  foto?: string;
}

export type AnimalInput = Omit<Animal, 'id_animal' | 'habitat'> & { habitat_id: number };
