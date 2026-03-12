document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const feedback = document.getElementById('loginFeedback');

  if (Auth.getToken()) {
    window.location.href = '/admin/';
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    feedback.textContent = 'Entrando...';
    feedback.className = 'feedback info';

    try {
      const response = await Api.login(email, password);
      const token = response.token || response.accessToken || response.jwt;
      if (!token) throw new Error('Token não encontrado na resposta do backend.');

      Auth.saveToken(token);
      feedback.textContent = 'Login realizado com sucesso!';
      feedback.className = 'feedback success';
      setTimeout(() => {
        window.location.href = '/admin/';
      }, 400);
    } catch (error) {
      feedback.textContent = error.message || 'Falha no login';
      feedback.className = 'feedback error';
    }
  });
});
