export const statusCards = [
  { title: 'ANIMAIS CADASTRADOS', count: 240, color: 'bg-primary-green' },
  { title: 'EM TRATAMENTO', count: 12, color: 'bg-secondary-green' },
  { title: 'CONSULTAS HOJE', count: 8, color: 'bg-primary-green' },
  { title: 'MANUTENÇÕES PENDENTES', count: 5, color: 'bg-secondary-green' },
]

// Dados para o gráfico de distribuição por habitat
export const animalHabitatData = {
  labels: ['Savana', 'Floresta', 'Aquático', 'Aviário', 'Deserto'],
  datasets: [{
    data: [45, 65, 40, 50, 40],
    backgroundColor: [
      '#FF6B6B', // Vermelho
      '#4ECDC4', // Turquesa
      '#45B7D1', // Azul claro
      '#96C', // Roxo
      '#FFB347'  // Laranja
    ],
    borderWidth: 1,
    borderColor: '#FFFFFF'
  }]
}

// Dados para ocupação por setor
export const animalSetorData = {
  labels: ['Mamíferos', 'Aves', 'Répteis', 'Peixes', 'Anfíbios'],
  datasets: [{
    data: [35, 25, 20, 15, 15],
    backgroundColor: [
      '#FF6B6B', // Vermelho
      '#4ECDC4', // Turquesa
      '#45B7D1', // Azul claro
      '#96C', // Roxo
      '#FFB347'  // Laranja
    ],
    borderWidth: 1,
    borderColor: '#FFFFFF'
  }]
}

export const funcHabitatData = {
  labels: ['Savana', 'Floresta', 'Aquático', 'Aviário', 'Deserto'],
  datasets: [{
    data: [3, 5, 2, 1, 5],
    backgroundColor: [
      '#FF6B6B', // Vermelho
      '#4ECDC4', // Turquesa
      '#45B7D1', // Azul claro
      '#96C', // Roxo
      '#FFB347'  // Laranja
    ],
    borderWidth: 1,
    borderColor: '#FFFFFF'
  }]
}

// Dados para ocupação por setor
export const funcSetorData = {
  labels: ['Mamíferos', 'Aves', 'Répteis', 'Peixes', 'Anfíbios'],
  datasets: [{
    data: [5, 3, 2, 3, 2],
    backgroundColor: [
      '#FF6B6B', // Vermelho
      '#4ECDC4', // Turquesa
      '#45B7D1', // Azul claro
      '#96C', // Roxo
      '#FFB347'  // Laranja
    ],
    borderWidth: 1,
    borderColor: '#FFFFFF'
  }]
}
