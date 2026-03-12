/**
 * API.js - Integração com o backend Node.js/Express
 * Base URL: https://zaia-uniformes-backend.onrender.com
 */

const API_BASE_URL = 'https://zaia-uniformes-backend.onrender.com';

/**
 * Obtém o token JWT do localStorage
 */
function getToken() {
  return localStorage.getItem('authToken');
}

/**
 * Define o token JWT no localStorage
 */
function setToken(token) {
  localStorage.setItem('authToken', token);
}

/**
 * Remove o token JWT do localStorage
 */
function removeToken() {
  localStorage.removeItem('authToken');
}

/**
 * Função auxiliar para fazer requisições autenticadas
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Se receber 401, token expirou
    if (response.status === 401) {
      removeToken();
      window.location.href = '/admin/login.html';
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Erro: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * AUTENTICAÇÃO
 */

// Login
async function login(email, password) {
  return apiCall('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

// Verificar se está autenticado
async function verifyAuth() {
  try {
    return await apiCall('/api/auth/me', { method: 'GET' });
  } catch {
    return null;
  }
}

/**
 * CONTEÚDO (Landing Page)
 */

// Listar todos os conteúdos
async function getContent() {
  return apiCall('/api/content', { method: 'GET' });
}

// Obter conteúdo específico por chave
async function getContentByKey(key) {
  return apiCall(`/api/content/${key}`, { method: 'GET' });
}

// Criar novo conteúdo
async function createContent(data) {
  return apiCall('/api/content', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Atualizar conteúdo
async function updateContent(key, data) {
  return apiCall(`/api/content/${key}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Deletar conteúdo
async function deleteContent(key) {
  return apiCall(`/api/content/${key}`, { method: 'DELETE' });
}

/**
 * UPLOAD DE IMAGENS
 */
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('imageFile', file);

  const url = `${API_BASE_URL}/api/content/upload/image`;
  const token = getToken();
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (response.status === 401) {
      removeToken();
      window.location.href = '/admin/login.html';
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Erro no upload: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
}

/**
 * PARCEIROS
 */

// Listar parceiros
async function getPartners() {
  return apiCall('/api/partners', { method: 'GET' });
}

// Criar parceiro
async function createPartner(name, logoFile) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('logoFile', logoFile);

  const url = `${API_BASE_URL}/api/partners`;
  const token = getToken();
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (response.status === 401) {
      removeToken();
      window.location.href = '/admin/login.html';
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Erro: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Create Partner Error:', error);
    throw error;
  }
}

// Deletar parceiro
async function deletePartner(id) {
  return apiCall(`/api/partners/${id}`, { method: 'DELETE' });
}

/**
 * USUÁRIOS
 */

// Listar usuários
async function getUsers() {
  return apiCall('/api/users', { method: 'GET' });
}

// Criar usuário
async function createUser(data) {
  return apiCall('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Atualizar usuário
async function updateUser(id, data) {
  return apiCall(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Deletar usuário
async function deleteUser(id) {
  return apiCall(`/api/users/${id}`, { method: 'DELETE' });
}

// Fazer logout
function logout() {
  removeToken();
  window.location.href = '/admin/login.html';
}
