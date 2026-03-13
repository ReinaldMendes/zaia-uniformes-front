/**
 * Dynamic Content Loader - Para carregar conteúdo dinâmico da API na landing page
 *
 * Exemplo de uso:
 * <h1 data-content="hero_title">Carregando...</h1>
 * <p data-content="hero_subtitle">Carregando...</p>
 *
 * <script src="admin/api.js"></script>
 * <script src="js/dynamic-content-loader.js"></script>
 */

const API_BASE_URL = "https://zaia-uniformes-backend.onrender.com";

// injetar estilos necessários para a toolbar admin
(function addEditorStyles() {
  const css = `
#adminToolbar {
  position: fixed !important;
  top: 10px !important;
  right: 10px !important;
  background: rgba(30,58,95,0.9) !important;
  color: white !important;
  padding: 8px 12px !important;
  border-radius: 4px !important;
  z-index: 10000 !important;
  font-size: 14px !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
  display: flex !important;
  align-items: center !important;
  visibility: visible !important;
}
#adminToolbar a {
  color: white !important;
  text-decoration: none !important;
  margin-right: 10px !important;
}
#adminToolbar button {
  background: #EF4444 !important;
  color: white !important;
  border: none !important;
  padding: 5px 10px !important;
  border-radius: 4px !important;
  cursor: pointer !important;
}
`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

// toolbar admin
function showAdminToolbar() {
  console.log('🔍 showAdminToolbar: Verificando se usuário é admin...');
  const adminCheck = isAdmin();
  console.log('🔍 isAdmin() retornou:', adminCheck);

  if (!adminCheck) {
    console.log('❌ Usuário não é admin, toolbar não será mostrado');
    return;
  }

  console.log('✅ Usuário é admin, criando toolbar...');

  // remover toolbar existente se houver
  const existing = document.getElementById('adminToolbar');
  if (existing) existing.remove();

  const toolbar = document.createElement('div');
  toolbar.id = 'adminToolbar';
  toolbar.innerHTML = `
    <a href="/zaiaUniformes/admin/dashboard.html">📊 Dashboard</a>
    <button id="adminLogout">🚪 Logout</button>
  `;

  document.body.appendChild(toolbar);
  console.log('✅ Toolbar criado e adicionado ao body');

  document.getElementById('adminLogout').addEventListener('click', () => {
    console.log('🔍 Logout clicado');
    removeToken();
    localStorage.removeItem('userRole');
    window.location.reload();
  });
}

/**
 * Carrega conteúdo dinâmico da API
 * Busca todos os elementos com atributo data-content
 */
async function loadDynamicContent() {
  const elements = document.querySelectorAll('[data-content]');

  if (elements.length === 0) return; // Nada para carregar

  // Coletar todas as chaves únicas
  const keys = new Set();
  elements.forEach(el => {
    const key = el.getAttribute('data-content');
    if (key) keys.add(key);
  });

  // Buscar conteúdo da API
  try {
    const response = await fetch(`${API_BASE_URL}/api/content`);
    let contentList = [];

    if (response.ok) {
      const data = await response.json();
      // garantir que seja um array
      contentList = Array.isArray(data) ? data : [];
    } else {
      console.warn('API content retornou status não-ok:', response.status);
    }

    // Criar mapa de conteúdo
    const contentMap = {};
    contentList.forEach(item => {
      contentMap[item.key] = item.value;
    });

    // Atualizar elementos
    elements.forEach(el => {
      const key = el.getAttribute('data-content');
      if (contentMap[key]) {
        const content = contentMap[key];

        // Verificar se é HTML ou texto
        if (el.getAttribute('data-html') === 'true') {
          el.innerHTML = content;
        } else {
          el.textContent = content;
        }

        // Remover classe de carregamento
        el.classList.remove('loading');
      }
    });

    console.log('Conteúdo dinâmico carregado com sucesso!');
  } catch (error) {
    console.error('Erro ao carregar conteúdo dinâmico:', error);
  }
}

/**
 * Carrega uma imagem dinâmica da API
 * Exemplo: <img data-image="hero_image" alt="Hero" src="placeholder.png">
 */
async function loadDynamicImages() {
  const images = document.querySelectorAll('[data-image]');

  if (images.length === 0) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/content`);
    let contentList = [];

    if (response.ok) {
      const data = await response.json();
      contentList = Array.isArray(data) ? data : [];
    } else {
      console.warn('API content images retornou status não-ok:', response.status);
    }

    const contentMap = {};
    contentList.forEach(item => {
      contentMap[item.key] = item.value;
    });

    images.forEach(img => {
      const key = img.getAttribute('data-image');
      if (contentMap[key]) {
        img.src = contentMap[key];
        img.classList.remove('loading');
      }
    });

    console.log('Imagens dinâmicas carregadas!');
  } catch (error) {
    console.error('Erro ao carregar imagens:', error);
  }
}

/**
 * Carrega parceiros dinamicamente
 * Exemplo: <div data-partners="list" class="partners"></div>
 */
async function loadDynamicPartners() {
  const partnerContainers = document.querySelectorAll('[data-partners="list"]');

  if (partnerContainers.length === 0) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/partners`);
    let partners = [];

    if (response.ok) {
      const data = await response.json();
      partners = Array.isArray(data) ? data : [];
    } else {
      console.warn('API partners retornou status não-ok:', response.status);
    }

    partnerContainers.forEach(container => {
      const template = container.getAttribute('data-template') || 'grid';

      let html = '';

      if (template === 'grid') {
        html = partners.map(p => `
          <div class="partner-item">
            ${p.logoUrl ? `<img src="${p.logoUrl}" alt="${p.name}" class="partner-logo">` : ''}
            <p class="partner-name">${p.name}</p>
          </div>
        `).join('');
      } else if (template === 'slider') {
        html = partners.map(p => `
          <div class="swiper-slide">
            <img src="${p.logoUrl || 'placeholder.png'}" alt="${p.name}">
          </div>
        `).join('');
      }

      if (html) {
        container.innerHTML = html;
        // Se usar Swiper, reinicializar
        if (window.Swiper && container.closest('.swiper')) {
          new Swiper(container.closest('.swiper'), {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 20,
          });
        }
      }

      container.classList.remove('loading');
    });

    console.log('Parceiros carregados!');
  } catch (error) {
    console.error('Erro ao carregar parceiros:', error);
  }
}

/**
 * Inicializa o carregamento dinâmico quando o DOM estiver pronto
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOMContentLoaded - Iniciando carregamento dinâmico');
  loadDynamicContent();
  loadDynamicImages();
  loadDynamicPartners();
  showAdminToolbar();
});

/**
 * Função para recarregar conteúdo manualmente
 */
function refreshDynamicContent() {
  loadDynamicContent();
  loadDynamicImages();
  loadDynamicPartners();
}
