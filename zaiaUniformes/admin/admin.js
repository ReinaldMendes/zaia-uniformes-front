/**
 * Admin.js - Lógica do painel de administração
 */

let currentTab = 'content';
let contentList = [];
let partnersList = [];
let usersList = [];

/**
 * INICIALIZAÇÃO
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Verificar autenticação
  requireAuth();

  // Carregar dados iniciais
  await loadAllData();

  // Setup event listeners
  setupEventListeners();
});

/**
 * Carrega todos os dados do painel
 */
async function loadAllData() {
  try {
    showLoading(true);
    await loadContent();
    await loadPartners();
    await loadUsers();
  } catch (error) {
    showAlert('Erro ao carregar dados: ' + error.message, 'error');
  } finally {
    showLoading(false);
  }
}

/**
 * GERENCIAMENTO DE ABAS
 */
function switchTab(tab) {
  currentTab = tab;

  // Atualizar botões
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Mostrar conteúdo correspondente
  document.querySelectorAll('.tab-content').forEach(content => {
    content.style.display = 'none';
  });
  document.getElementById(`${tab}-tab`).style.display = 'block';
}

/**
 * CONTEÚDO (Landing Page)
 */

async function loadContent() {
  try {
    contentList = await getContent();
    renderContentList();
  } catch (error) {
    showAlert('Erro ao carregar conteúdos: ' + error.message, 'error');
  }
}

function renderContentList() {
  const container = document.getElementById('contentList');
  
  if (!contentList || contentList.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhum conteúdo encontrado.</p>';
    return;
  }

  container.innerHTML = contentList.map(item => `
    <div class="content-item bg-white p-4 border border-gray-200 rounded-lg">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h4 class="font-semibold text-gray-900">${item.key}</h4>
          <p class="text-sm text-gray-600 max-w-lg break-words">${item.value?.substring(0, 100) || '(vazio)'}...</p>
        </div>
        <button 
          onclick="editContent('${item.key}')"
          class="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Editar
        </button>
      </div>
      <button 
        onclick="deleteContent('${item.key}')"
        class="text-red-500 text-sm hover:text-red-700"
      >
        Deletar
      </button>
    </div>
  `).join('');
}

function openNewContentForm() {
  const modal = document.getElementById('contentModal');
  modal.dataset.editKey = '';
  document.getElementById('contentForm').reset();
  document.getElementById('modalTitle').textContent = 'Novo Conteúdo';
  modal.style.display = 'flex';
}

function editContent(key) {
  const item = contentList.find(c => c.key === key);
  if (!item) return;

  const modal = document.getElementById('contentModal');
  modal.dataset.editKey = key;
  document.getElementById('contentKey').value = key;
  document.getElementById('contentValue').value = item.value || '';
  document.getElementById('modalTitle').textContent = `Editar: ${key}`;
  modal.style.display = 'flex';
}

async function handleContentFormSubmit(e) {
  e.preventDefault();

  const key = document.getElementById('contentKey').value.trim();
  const value = document.getElementById('contentValue').value.trim();

  if (!key || !value) {
    showAlert('Preencha todos os campos.', 'error');
    return;
  }

  try {
    showLoading(true);
    const editKey = document.getElementById('contentModal').dataset.editKey;

    if (editKey) {
      // Atualizar
      await updateContent(editKey, { key, value });
      showAlert('Conteúdo atualizado com sucesso!', 'success');
    } else {
      // Criar
      await createContent({ key, value });
      showAlert('Conteúdo criado com sucesso!', 'success');
    }

    closeContentModal();
    await loadContent();
  } catch (error) {
    showAlert('Erro: ' + error.message, 'error');
  } finally {
    showLoading(false);
  }
}

async function deleteContent(key) {
  if (!confirm(`Tem certeza que deseja deletar "${key}"?`)) return;

  try {
    showLoading(true);
    await deleteContent(key);
    showAlert('Conteúdo deletado com sucesso!', 'success');
    await loadContent();
  } catch (error) {
    showAlert('Erro ao deletar: ' + error.message, 'error');
  } finally {
    showLoading(false);
  }
}

function closeContentModal() {
  document.getElementById('contentModal').style.display = 'none';
}

/**
 * PARCEIROS
 */

async function loadPartners() {
  try {
    partnersList = await getPartners();
    renderPartnersList();
  } catch (error) {
    showAlert('Erro ao carregar parceiros: ' + error.message, 'error');
  }
}

function renderPartnersList() {
  const container = document.getElementById('partnersList');
  
  if (!partnersList || partnersList.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhum parceiro cadastrado.</p>';
    return;
  }

  container.innerHTML = partnersList.map(partner => `
    <div class="partner-item bg-white p-4 border border-gray-200 rounded-lg">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          ${partner.logoUrl ? `<img src="${partner.logoUrl}" alt="${partner.name}" class="w-12 h-12 object-contain rounded">` : ''}
          <div>
            <h4 class="font-semibold text-gray-900">${partner.name}</h4>
            <p class="text-xs text-gray-600">${new Date(partner.createdAt).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
        <button 
          onclick="deletePartner('${partner._id}')"
          class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          Deletar
        </button>
      </div>
    </div>
  `).join('');
}

function openNewPartnerForm() {
  const modal = document.getElementById('partnerModal');
  document.getElementById('partnerForm').reset();
  document.getElementById('partnerModalTitle').textContent = 'Novo Parceiro';
  modal.style.display = 'flex';
}

async function handlePartnerFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('partnerName').value.trim();
  const logoFile = document.getElementById('partnerLogo').files[0];

  if (!name) {
    showAlert('Digite o nome do parceiro.', 'error');
    return;
  }

  if (!logoFile) {
    showAlert('Selecione uma imagem para o parceiro.', 'error');
    return;
  }

  try {
    showLoading(true);
    await createPartner(name, logoFile);
    showAlert('Parceiro criado com sucesso!', 'success');
    closePartnerModal();
    await loadPartners();
  } catch (error) {
    showAlert('Erro: ' + error.message, 'error');
  } finally {
    showLoading(false);
  }
}

async function deletePartner(id) {
  if (!confirm('Tem certeza que deseja deletar este parceiro?')) return;

  try {
    showLoading(true);
    await deletePartner(id);
    showAlert('Parceiro deletado com sucesso!', 'success');
    await loadPartners();
  } catch (error) {
    showAlert('Erro ao deletar: ' + error.message, 'error');
  } finally {
    showLoading(false);
  }
}

function closePartnerModal() {
  document.getElementById('partnerModal').style.display = 'none';
}

/**
 * USUÁRIOS
 */

async function loadUsers() {
  try {
    usersList = await getUsers();
    renderUsersList();
  } catch (error) {
    showAlert('Erro ao carregar usuários: ' + error.message, 'error');
  }
}

function renderUsersList() {
  const container = document.getElementById('usersList');
  
  if (!usersList || usersList.length === 0) {
    container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhum usuário cadastrado.</p>';
    return;
  }

  container.innerHTML = usersList.map(user => `
    <div class="user-item bg-white p-4 border border-gray-200 rounded-lg">
      <div class="flex justify-between items-start">
        <div>
          <h4 class="font-semibold text-gray-900">${user.name}</h4>
          <p class="text-sm text-gray-600">${user.email}</p>
          <p class="text-xs text-gray-500 mt-1">Role: ${user.role || 'user'}</p>
          <p class="text-xs text-gray-500">Criado em: ${new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
        </div>
        <div class="flex gap-2">
          <button 
            onclick="editUser('${user._id}')"
            class="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Editar
          </button>
          <button 
            onclick="deleteUser('${user._id}')"
            class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function openNewUserForm() {
  const modal = document.getElementById('userModal');
  modal.dataset.editId = '';
  document.getElementById('userForm').reset();
  document.getElementById('userModalTitle').textContent = 'Novo Usuário';
  document.getElementById('passwordGroup').style.display = 'block';
  modal.style.display = 'flex';
}

function editUser(id) {
  const user = usersList.find(u => u._id === id);
  if (!user) return;

  const modal = document.getElementById('userModal');
  modal.dataset.editId = id;
  document.getElementById('userName').value = user.name;
  document.getElementById('userEmail').value = user.email;
  document.getElementById('userRole').value = user.role || 'user';
  document.getElementById('userPassword').value = '';
  document.getElementById('userModalTitle').textContent = `Editar: ${user.name}`;
  document.getElementById('passwordGroup').style.display = 'none';
  modal.style.display = 'flex';
}

async function handleUserFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('userModal').dataset.editId;
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const role = document.getElementById('userRole').value;
  const password = document.getElementById('userPassword').value;

  if (!name || !email) {
    showAlert('Preencha todos os campos obrigatórios.', 'error');
    return;
  }

  if (!editId && !password) {
    showAlert('Digite uma senha para o novo usuário.', 'error');
    return;
  }

  try {
    showLoading(true);
    const data = { name, email, role };
    if (password) data.password = password;

    if (editId) {
      await updateUser(editId, data);
      showAlert('Usuário atualizado com sucesso!', 'success');
    } else {
      await createUser(data);
      showAlert('Usuário criado com sucesso!', 'success');
    }

    closeUserModal();
    await loadUsers();
  } catch (error) {
    showAlert('Erro: ' + error.message, 'error');
  } finally {
    showLoading(false);
  }
}

async function deleteUser(id) {
  if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

  try {
    showLoading(true);
    await deleteUser(id);
    showAlert('Usuário deletado com sucesso!', 'success');
    await loadUsers();
  } catch (error) {
    showAlert('Erro ao deletar: ' + error.message, 'error');
  } finally {
    showLoading(false);
  }
}

function closeUserModal() {
  document.getElementById('userModal').style.display = 'none';
}

/**
 * UTILITÁRIOS
 */

function showLoading(isLoading) {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    loader.style.display = isLoading ? 'flex' : 'none';
  }
}

function showAlert(message, type = 'info') {
  const alertEl = document.getElementById('alertContainer');
  const alertContent = document.createElement('div');
  alertContent.className = `alert alert-${type}`;
  alertContent.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="close-btn">&times;</button>
  `;

  alertEl.appendChild(alertContent);

  // Auto-remover após 5 segundos
  setTimeout(() => {
    alertContent.style.opacity = '0';
    setTimeout(() => alertContent.remove(), 300);
  }, 5000);
}

function setupEventListeners() {
  // Event listeners dos formulários
  document.getElementById('contentForm')?.addEventListener('submit', handleContentFormSubmit);
  document.getElementById('partnerForm')?.addEventListener('submit', handlePartnerFormSubmit);
  document.getElementById('userForm')?.addEventListener('submit', handleUserFormSubmit);

  // Fechar modais ao clicar fora
  document.getElementById('contentModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'contentModal') closeContentModal();
  });
  document.getElementById('partnerModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'partnerModal') closePartnerModal();
  });
  document.getElementById('userModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'userModal') closeUserModal();
  });
}
