// API Configuration and Client

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://predict-production-28b1.up.railway.app';

interface RequestOptions extends RequestInit {
  timeout?: number;
}

/**
 * Effectue une requête API avec gestion d'erreurs
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const token = localStorage.getItem('authToken');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Merge avec les headers fournis
    if (fetchOptions.headers instanceof Headers) {
      fetchOptions.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (fetchOptions.headers) {
      Object.assign(headers, fetchOptions.headers);
    }

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: response.statusText,
      }));
      throw new Error(error.error || error.message || response.statusText);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      throw new Error(`Erreur API: ${error.message}`);
    }
    throw new Error('Erreur API inconnue');
  }
}

/**
 * Service API pour les routes d'authentification
 */
export const authAPI = {
  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    location: string;
  }) =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        nom: data.lastName,
        prenom: data.firstName,
        role: data.role,
        location: data.location,
      }),
    }),

  login: (data: { email: string; password: string }) =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiRequest('/api/auth/logout', {
      method: 'POST',
    }),

  forgotPassword: (data: { email: string }) =>
    apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  resetPassword: (data: {
    token: string;
    newPassword: string;
  }) =>
    apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  verifyToken: (token: string) =>
    apiRequest('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
};

/**
 * Service API pour les prédictions de salaire
 */
export const predictionAPI = {
  predict: (data: Record<string, unknown>) =>
    apiRequest('/api/prediction/predict', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getPredictionHistory: () =>
    apiRequest('/api/prediction/history', {
      method: 'GET',
    }),

  deletePrediction: (id: string) =>
    apiRequest(`/api/prediction/${id}`, {
      method: 'DELETE',
    }),
};

/**
 * Service API pour la recherche
 */
export const searchAPI = {
  search: (query: string) =>
    apiRequest('/api/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    }),

  getFilters: () =>
    apiRequest('/api/search/filters', {
      method: 'GET',
    }),
};

/**
 * Service API pour les informations utilisateur
 */
export const userAPI = {
  getProfile: () =>
    apiRequest('/api/user/profile', {
      method: 'GET',
    }),

  updateProfile: (data: Record<string, unknown>) =>
    apiRequest('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getSettings: () =>
    apiRequest('/api/user/settings', {
      method: 'GET',
    }),

  updateSettings: (data: Record<string, unknown>) =>
    apiRequest('/api/user/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export { API_BASE_URL, apiRequest };
