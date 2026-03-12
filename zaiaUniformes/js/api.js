const API_BASE_URL = 'https://zaia-uniformes-backend.onrender.com';

function buildHeaders(extraHeaders = {}, useAuth = false) {
  const headers = { ...extraHeaders };
  if (useAuth) {
    const token = localStorage.getItem('zaia_token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function apiRequest(path, options = {}) {
  const { method = 'GET', body, headers = {}, useAuth = false, isFormData = false } = options;

  const requestOptions = {
    method,
    headers: buildHeaders(headers, useAuth)
  };

  if (body !== undefined) {
    if (isFormData) {
      requestOptions.body = body;
    } else {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, requestOptions);
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = payload?.message || payload?.error || payload || 'Erro na requisição';
    throw new Error(message);
  }

  return payload;
}

const Api = {
  login: (email, password) => apiRequest('/api/auth/login', { method: 'POST', body: { email, password } }),

  getAllContent: () => apiRequest('/api/content', { useAuth: true }),
  getContentByKey: (key) => apiRequest(`/api/content/${encodeURIComponent(key)}`),
  createContent: (content) => apiRequest('/api/content', { method: 'POST', body: content, useAuth: true }),
  updateContent: (key, content) => apiRequest(`/api/content/${encodeURIComponent(key)}`, { method: 'PUT', body: content, useAuth: true }),
  deleteContent: (key) => apiRequest(`/api/content/${encodeURIComponent(key)}`, { method: 'DELETE', useAuth: true }),
  uploadImage: (formData) => apiRequest('/api/content/upload/image', { method: 'POST', body: formData, isFormData: true, useAuth: true }),

  getPartners: () => apiRequest('/api/partners', { useAuth: true }),
  createPartner: (formData) => apiRequest('/api/partners', { method: 'POST', body: formData, isFormData: true, useAuth: true }),
  deletePartner: (id) => apiRequest(`/api/partners/${id}`, { method: 'DELETE', useAuth: true }),

  getUsers: () => apiRequest('/api/users', { useAuth: true }),
  createUser: (user) => apiRequest('/api/users', { method: 'POST', body: user, useAuth: true }),
  updateUser: (id, user) => apiRequest(`/api/users/${id}`, { method: 'PUT', body: user, useAuth: true }),
  deleteUser: (id) => apiRequest(`/api/users/${id}`, { method: 'DELETE', useAuth: true })
};
