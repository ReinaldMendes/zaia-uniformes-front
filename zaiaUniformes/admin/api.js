/*
API.js - Integração com backend ZAIA
*/

const API_BASE_URL = "https://zaia-uniformes-backend.onrender.com";
const BASE_PATH = "/zaiaUniformes";

/*
TOKEN
*/

function getToken() {
  return localStorage.getItem("authToken");
}

/**
 * Extrai papel/role do usuário do token JWT ou do localStorage.
 * O backend inclui `role` no payload do JWT.
 */
function getUserRole() {
  // primariamente tentamos a chave armazenada diretamente
  const stored = localStorage.getItem("userRole");
  if (stored) return stored;

  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // verificar se o backend usa 'role' ou 'isAdmin'
    if (payload.role) return payload.role;
    if (payload.isAdmin !== undefined) {
      return payload.isAdmin ? 'ADMIN' : 'USER';
    }
    return null;
  } catch {
    return null;
  }
}

function isAdmin() {
  const role = getUserRole();
  console.log('🔍 isAdmin check - Role:', role);
  // aceitar diferentes formatos que o backend pode usar
  return role === 'ADMIN' || role === 'admin' || role === 'ADMINISTRATOR' || role === true;
}

function setToken(token) {
  localStorage.setItem("authToken", token);
}

function removeToken() {
  localStorage.removeItem("authToken");
}

/*
REDIRECIONAR PARA LOGIN
*/

function redirectToLogin() {
  window.location.href = `${BASE_PATH}/admin/login.html`;
}

/*
REQUISIÇÃO PADRÃO
*/

async function apiCall(endpoint, options = {}) {

  const url = API_BASE_URL + endpoint;

  const token = getToken();

  const headers = {
    ...(options.headers || {})
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const config = {
    ...options,
    headers
  };

  try {

    const response = await fetch(url, config);

    if (response.status === 401) {

      removeToken();
      redirectToLogin();

      throw new Error("Sessão expirada. Faça login novamente.");
    }

    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {

      const message = data?.message || "Erro " + response.status;

      throw new Error(message);
    }

    return data;

  } catch (error) {

    console.error("API Error:", error);

    throw error;

  }
}

/*
AUTH

De acordo com a documentação do backend, as rotas são:
  POST /auth/login          -> body { email, password }
  POST /auth/register       -> body { name, email, password, isAdmin? }

O base URL configurado (API_BASE_URL) já aponta para
https://zaia-uniformes-backend.onrender.com, então todos os
endpoints aqui antepõem "/api" para manter compatibilidade
com o servidor atual.
*/

async function login(email, password) {
  const response = await apiCall("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  });

  if (response && response.token) {
    setToken(response.token);

    // tentar salvar role do usuário - pode vir na resposta ou no token
    let role = null;
    if (response.user) {
      role = response.user.role || (response.user.isAdmin ? 'ADMIN' : 'USER');
    } else {
      // tentar extrair do token JWT
      try {
        const payload = JSON.parse(atob(response.token.split(".")[1]));
        role = payload.role || (payload.isAdmin ? 'ADMIN' : 'USER');
      } catch (e) {
        console.warn('Não foi possível extrair role do token:', e);
      }
    }

    if (role) {
      localStorage.setItem("userRole", role);
      console.log('Role salvo:', role);
    }
  }

  return response;
}

// opcionalmente podemos expor registro para facilitar testes
async function register(name, email, password, isAdmin = false) {
  const response = await apiCall("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      isAdmin
    })
  });

  // o backend normalmente não retorna token ao registrar,
  // mas deixamos o retorno para o chamador decidir.
  return response;
}

async function verifyAuth() {
  // o backend original não documentou "/auth/me"; se ele não
  // existir, tratar como instância qualquer chamada que
  // confirme o token. Caso precise, ajuste para "/auth/verify".
  try {
    return await apiCall("/api/auth/me");
  } catch {
    return null;
  }
}

/*
CONTENT
*/

function getContent() {
  return apiCall("/api/content");
}

function getContentByKey(key) {
  return apiCall("/api/content/" + key);
}

function createContent(data) {
  return apiCall("/api/content", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

function updateContent(key, data) {
  return apiCall("/api/content/" + key, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

function deleteContent(key) {
  return apiCall("/api/content/" + key, {
    method: "DELETE"
  });
}

/*
UPLOAD IMAGE
*/

function uploadImage(file) {

  const formData = new FormData();

  formData.append("imageFile", file);

  return apiCall("/api/content/upload/image", {
    method: "POST",
    body: formData
  });
}

/*
PARTNERS
*/

function getPartners() {
  return apiCall("/api/partners");
}

function createPartner(name, logoFile) {

  const formData = new FormData();

  formData.append("name", name);
  formData.append("logoFile", logoFile);

  return apiCall("/api/partners", {
    method: "POST",
    body: formData
  });
}

function deletePartner(id) {
  return apiCall("/api/partners/" + id, {
    method: "DELETE"
  });
}

/*
USERS
*/

function getUsers() {
  return apiCall("/api/users");
}

function createUser(data) {
  return apiCall("/api/users", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

function updateUser(id, data) {
  return apiCall("/api/users/" + id, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

function deleteUser(id) {
  return apiCall("/api/users/" + id, {
    method: "DELETE"
  });
}

/*
LOGOUT
*/

function logout() {

  removeToken();

  redirectToLogin();

}