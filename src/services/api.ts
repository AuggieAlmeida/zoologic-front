import { Animal, AnimalInput } from "@/types/animal";
import { VeterinarioInput } from "@/types/veterinario";
import { HabitatInput } from "@/types/habitat";

// Set NEXT_PUBLIC_API_URL at build time to point the client at the deployed
// API. The localhost default keeps `next dev` working with no setup.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const defaultOptions = {
  headers: defaultHeaders,
  credentials: 'include' as RequestCredentials,
};

const TOKEN_STORAGE_KEY = 'zoologic_token';

export const clearAuthSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as { exp?: number };
    return typeof payload.exp === 'number' && payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token || isTokenExpired(token)) {
    if (token) clearAuthSession();
    return null;
  }
  return token;
};

const handleResponse = async (response: Response) => {
  if (response.status === 401 && typeof window !== 'undefined') {
    clearAuthSession();
    if (window.location.pathname !== '/login') {
      window.location.assign('/login');
    }
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || error.message || 'Erro na requisição');
  }
  return response.json();
};

export const colaboradoresService = {
  async listar() {
    try {
      const response = await fetch(`${API_BASE_URL}/colaboradores`, {
        method: 'GET',
        ...defaultOptions,
        headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error instanceof Error && error.message === 'Autenticação necessária'
        ? error
        : new Error('Não foi possível conectar ao servidor');
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
      headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
      body: JSON.stringify(dados),
    });
    return handleResponse(response);
  },

  async delegar(id: number, setor: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/colaboradores/${id}/delegar`, {
        method: 'PUT',
        ...defaultOptions,
        headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
        body: JSON.stringify({ setor }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error instanceof Error && error.message === 'Autenticação necessária'
        ? error
        : new Error('Não foi possível conectar ao servidor');
    }
  },
};

export const animaisService = {
  async listar() {
    try {
      const response = await fetch(`${API_BASE_URL}/animais`, {
        method: 'GET',
        ...defaultOptions,
        headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error instanceof Error && error.message === 'Autenticação necessária'
        ? error
        : new Error('Não foi possível conectar ao servidor');
    }
  },

  async buscar(id: number) {
    const response = await fetch(`${API_BASE_URL}/animais/${id}`, {
      method: 'GET',
      ...defaultOptions,
      headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
    });
    return handleResponse(response) as Promise<Animal>;
  },

  async criar(dados: AnimalInput) {
    const response = await fetch(`${API_BASE_URL}/animais`, {
      method: 'POST',
      ...defaultOptions,
      headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
      body: JSON.stringify(dados),
    });
    return handleResponse(response);
  },

  async atualizar(id: number, dados: Partial<AnimalInput>) {
    const response = await fetch(`${API_BASE_URL}/animais/${id}`, {
      method: 'PUT',
      ...defaultOptions,
      headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
      body: JSON.stringify(dados),
    });
    return handleResponse(response);
  },

  async excluir(id: number) {
    const response = await fetch(`${API_BASE_URL}/animais/${id}`, {
      method: 'DELETE',
      ...defaultOptions,
      headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
    });
    return handleResponse(response);
  },
}; 

export const veterinariosService = {
  async listar() {
    const response = await fetch(`${API_BASE_URL}/veterinarios`, {
      method: 'GET',
      ...defaultOptions,
      headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
    });
    return handleResponse(response);
  },

  async criar(dados: VeterinarioInput) {
    const response = await fetch(`${API_BASE_URL}/veterinarios`, {
      method: 'POST',
      ...defaultOptions,
      headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
      body: JSON.stringify(dados),
    });
    return handleResponse(response);
  },

  async atualizar(id: number, dados: Partial<VeterinarioInput>) {
    const response = await fetch(`${API_BASE_URL}/veterinarios/${id}`, {
      method: 'PUT',
      ...defaultOptions,
      headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
      body: JSON.stringify(dados),
    });
    return handleResponse(response);
  },

  async excluir(id: number) {
    const response = await fetch(`${API_BASE_URL}/veterinarios/${id}`, {
      method: 'DELETE',
      ...defaultOptions,
      headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` },
    });
    return handleResponse(response);
  },
};

export const habitatsService = {
  async listar() { const response = await fetch(`${API_BASE_URL}/habitats`, { ...defaultOptions, headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` } }); return handleResponse(response); },
  async criar(dados: HabitatInput) { const response = await fetch(`${API_BASE_URL}/habitats`, { method: 'POST', ...defaultOptions, headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` }, body: JSON.stringify(dados) }); return handleResponse(response); },
  async atualizar(id: number, dados: Partial<HabitatInput>) { const response = await fetch(`${API_BASE_URL}/habitats/${id}`, { method: 'PUT', ...defaultOptions, headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` }, body: JSON.stringify(dados) }); return handleResponse(response); },
  async excluir(id: number) { const response = await fetch(`${API_BASE_URL}/habitats/${id}`, { method: 'DELETE', ...defaultOptions, headers: { ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` } }); return handleResponse(response); },
};
