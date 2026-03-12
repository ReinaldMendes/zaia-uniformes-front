/**
 * Auth.js - Gerenciamento de autenticação
 */

/**
 * Verifica se o usuário está autenticado
 */
function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

/**
 * Redireciona para login se não autenticado
 */
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = '/admin/login.html';
  }
}

/**
 * Redireciona para dashboard se já autenticado
 */
function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    window.location.href = '/admin/dashboard.html';
  }
}

/**
 * Realiza o login
 */
async function handleLogin(email, password) {
  try {
    const response = await login(email, password);
    
    if (response.token) {
      setToken(response.token);
      // Redirecionar para dashboard
      window.location.href = '/admin/dashboard.html';
      return true;
    }
    
    throw new Error(response.message || 'Erro ao fazer login');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Realiza logout
 */
function handleLogout() {
  if (confirm('Tem certeza que deseja sair?')) {
    logout();
  }
}
