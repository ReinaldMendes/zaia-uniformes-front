const Auth = {
  tokenKey: 'zaia_token',

  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  },

  getToken() {
    return localStorage.getItem(this.tokenKey);
  },

  logout() {
    localStorage.removeItem(this.tokenKey);
    window.location.href = '/login.html';
  },

  requireAuth() {
    if (!this.getToken()) {
      window.location.href = '/login.html';
    }
  }
};
