const API_BASE_URL = 'http://localhost:8000';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Erro na requisição');
  }
  return response.json();
};

export const colaboradoresService = {
  async listar() {
    try {
      const response = await fetch(`${API_BASE_URL}/colaboradores`, {
        method: 'GET',
        headers: defaultHeaders,
        mode: 'cors',
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw new Error('Não foi possível conectar ao servidor');
    }
  },

  async criar(dados: {
    nome: string;
    email: string;
    senha: string;
    funcao: string;
    salario: number;
  }) {
    const response = await fetch(`${API_BASE_URL}/colaboradores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });
    return response.json();
  },

  async delegar(id: number, setor: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/colaboradores/${id}/delegar`, {
        method: 'PUT',
        headers: defaultHeaders,
        mode: 'cors',
        body: JSON.stringify({ setor }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw new Error('Não foi possível conectar ao servidor');
    }
  },
}; 