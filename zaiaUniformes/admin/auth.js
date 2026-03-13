
/**
 * Auth.js - Gerenciamento de autenticação
 *
 * Este arquivo depende de api.js, portanto deve ser importado
 * após ele nas páginas HTML. As funções de token (getToken,
 * setToken, removeToken) estão definidas em api.js e são usadas
 * aqui para manter o fluxo de autenticação centralizado.
 */

// O caminho base é definido em api.js para evitar duplicação. 
// api.js é carregado antes deste arquivo nas páginas HTML.
// (alternativamente poderíamos checar typeof BASE_PATH, mas
// a ordem de importação já garante sua existência.)

/**
 * Verifica se o usuário está autenticado
 */
function isAuthenticated() {
  // utiliza a função exportada por api.js para manter a
  // lógica de armazenamento centralizada
  return !!getToken();
}

/**
 * Redireciona para login se não autenticado
 */
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = `${BASE_PATH}/admin/login.html`;
  }
}

/**
 * Redireciona para dashboard se já autenticado
 */
function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    window.location.href = `${BASE_PATH}/admin/dashboard.html`;
  }
}

/**
 * Realiza o login
 */
async function handleLogin(email, password) {
  try {
    const response = await login(email, password);

    if (response && response.token) {
      setToken(response.token);
      
      // após login, redirecionamos para a landing page editável
      // em vez de enviar diretamente ao dashboard; o toolbar
      // de administrador ficará visível lá.
      window.location.href = `/zaiaUniformes/index.html`;
      return true;
    }

    throw new Error(response.message || "Credenciais inválidas");
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * Realiza logout
 */
function handleLogout() {
  if (confirm("Tem certeza que deseja sair?")) {
    logout();
  }
}

/**
 * Protege páginas administrativas
 * Deve ser chamado no início de cada página admin
 */
function protectAdminPage() {
  if (!isAuthenticated()) {
    // pode ser chamada por outras páginas além do dashboard
    window.location.href = `${BASE_PATH}/admin/login.html`;
  }
}

/**
 * Inicialização automática de proteção
 * Pode ser usado em dashboard.html
 */
document.addEventListener("DOMContentLoaded", () => {
  const isLoginPage = window.location.pathname.includes("login.html");

  if (!isLoginPage) {
    requireAuth();
  }
});