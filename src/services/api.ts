import { Animal, AnimalInput } from "@/types/animal";
import { Veterinario, VeterinarioInput } from "@/types/veterinario";
import { Habitat, HabitatInput } from "@/types/habitat";
import { Colaborador, ColaboradorUpdate } from "@/types/colaborador";

// The browser talks to the API on its own origin. next.config.js rewrites
// /api/* to NEXT_PUBLIC_API_URL, so there is no CORS preflight in front of
// each new URL and any deployment URL works without being allowlisted.
export const API_BASE_URL = '/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const defaultOptions = {
  headers: defaultHeaders,
  credentials: 'include' as RequestCredentials,
};

const TOKEN_STORAGE_KEY = 'zoologic_token';

// Several screens read the same lists: the dashboard, statistics and reports
// all load animals, habitats and veterinarians. Keeping each GET for a short
// while, and sharing a request that is already on its way, turns navigation
// between screens into a render instead of a round trip to an API that sits
// about 130 ms away. Any write clears everything, since one change can move
// numbers on several screens (an animal changes habitat occupancy).
const CACHE_TTL_MS = 60_000;
const responseCache = new Map<string, { at: number; data: unknown }>();
const inFlight = new Map<string, Promise<unknown>>();

export const clearApiCache = () => {
  responseCache.clear();
  inFlight.clear();
};

export const clearAuthSession = () => {
  clearApiCache();
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

const authHeaders = () => ({ ...defaultHeaders, Authorization: `Bearer ${getAuthToken() ?? ''}` });

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

// fetch rejects with a TypeError only when the request never got an answer.
const connectionError = (error: unknown) => {
  if (error instanceof TypeError) {
    console.error('Erro na requisição:', error);
    return new Error('Não foi possível conectar ao servidor');
  }
  return error;
};

const cachedGet = <T>(path: string): Promise<T> => {
  const hit = responseCache.get(path);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return Promise.resolve(hit.data as T);

  const pending = inFlight.get(path);
  if (pending) return pending as Promise<T>;

  const request = fetch(`${API_BASE_URL}${path}`, { method: 'GET', ...defaultOptions, headers: authHeaders() })
    .then(handleResponse)
    .then(data => {
      responseCache.set(path, { at: Date.now(), data });
      return data;
    })
    .catch(error => { throw connectionError(error); })
    .finally(() => inFlight.delete(path));

  inFlight.set(path, request);
  return request as Promise<T>;
};

const send = async (method: 'POST' | 'PUT' | 'DELETE', path: string, body?: unknown) => {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      ...defaultOptions,
      headers: authHeaders(),
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return await handleResponse(response);
  } catch (error) {
    throw connectionError(error);
  } finally {
    clearApiCache();
  }
};

// Warms the lists every screen reads, so the first visit to each one renders
// from memory. Failures are left for the screen itself to report.
export const prefetchLists = () => {
  ['/animais', '/habitats', '/veterinarios', '/colaboradores'].forEach(path => {
    cachedGet(path).catch(() => undefined);
  });
};

export const colaboradoresService = {
  listar() { return cachedGet<Colaborador[]>('/colaboradores'); },

  criar(dados: {
    nome: string;
    email: string;
    senha: string;
    funcao: string;
    salario: number;
  }) { return send('POST', '/colaboradores', dados); },

  delegar(id: number, setor: string) { return send('PUT', `/colaboradores/${id}/delegar`, { setor }); },

  atualizar(id: number, dados: ColaboradorUpdate) { return send('PUT', `/colaboradores/${id}`, dados); },

  excluir(id: number) { return send('DELETE', `/colaboradores/${id}`); },
};

export const animaisService = {
  listar() { return cachedGet<Animal[]>('/animais'); },

  buscar(id: number) { return cachedGet<Animal>(`/animais/${id}`); },

  criar(dados: AnimalInput) { return send('POST', '/animais', dados); },

  atualizar(id: number, dados: Partial<AnimalInput>) { return send('PUT', `/animais/${id}`, dados); },

  excluir(id: number) { return send('DELETE', `/animais/${id}`); },
};

export const veterinariosService = {
  listar() { return cachedGet<Veterinario[]>('/veterinarios'); },

  criar(dados: VeterinarioInput) { return send('POST', '/veterinarios', dados); },

  atualizar(id: number, dados: Partial<VeterinarioInput>) { return send('PUT', `/veterinarios/${id}`, dados); },

  excluir(id: number) { return send('DELETE', `/veterinarios/${id}`); },
};

export const habitatsService = {
  listar() { return cachedGet<Habitat[]>('/habitats'); },

  criar(dados: HabitatInput) { return send('POST', '/habitats', dados); },

  atualizar(id: number, dados: Partial<HabitatInput>) { return send('PUT', `/habitats/${id}`, dados); },

  excluir(id: number) { return send('DELETE', `/habitats/${id}`); },
};
