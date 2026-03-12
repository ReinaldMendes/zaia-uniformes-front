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

const API_BASE_URL = 'https://zaia-uniformes-backend.onrender.com';

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
    const contentList = await fetch(`${API_BASE_URL}/api/content`)
      .then(res => {
        if (res.status === 401) return []; // API pode exigir autenticação
        return res.ok ? res.json() : [];
      })
      .catch(() => []);

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
    const contentList = await fetch(`${API_BASE_URL}/api/content`)
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);

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
    const partners = await fetch(`${API_BASE_URL}/api/partners`)
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);

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
  loadDynamicContent();
  loadDynamicImages();
  loadDynamicPartners();
});

/**
 * Função para recarregar conteúdo manualmente
 */
function refreshDynamicContent() {
  loadDynamicContent();
  loadDynamicImages();
  loadDynamicPartners();
}
