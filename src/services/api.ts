import { Animal } from "@/types/animal";

const API_BASE_URL = 'http://localhost:8000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const defaultOptions = {
  headers: defaultHeaders,
  credentials: 'include' as RequestCredentials,
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
        ...defaultOptions,
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
      ...defaultOptions,
      body: JSON.stringify(dados),
    });
    return handleResponse(response);
  },

  async delegar(id: number, setor: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/colaboradores/${id}/delegar`, {
        method: 'PUT',
        ...defaultOptions,
        body: JSON.stringify({ setor }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw new Error('Não foi possível conectar ao servidor');
    }
  },
};

export const animaisService = {
  async listar() {
    try {
      const response = await fetch(`${API_BASE_URL}/animais`, {
        method: 'GET',
        ...defaultOptions,
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw new Error('Não foi possível conectar ao servidor');
    }
  },

  async criar(dados: Omit<Animal, 'id_animal'>) {
    const response = await fetch(`${API_BASE_URL}/animais`, {
      method: 'POST',
      ...defaultOptions,
      body: JSON.stringify(dados),
    });
    return handleResponse(response);
  },

  async atualizar(id: number, dados: Partial<Animal>) {
    const response = await fetch(`${API_BASE_URL}/animais/${id}`, {
      method: 'PUT',
      ...defaultOptions,
      body: JSON.stringify(dados),
    });
    return handleResponse(response);
  },

  async excluir(id: number) {
    const response = await fetch(`${API_BASE_URL}/animais/${id}`, {
      method: 'DELETE',
      ...defaultOptions,
    });
    return handleResponse(response);
  },
}; 