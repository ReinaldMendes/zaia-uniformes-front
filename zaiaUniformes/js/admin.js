function setStatus(elementId, message, type = 'info') {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = `feedback ${type}`;
}

function unwrapArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

function renderContentRows(items) {
  const tbody = document.getElementById('contentTableBody');
  tbody.innerHTML = '';

  items.forEach((item) => {
    const key = item.key || item.slug || item.name;
    const value = item.value ?? item.content ?? '';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${key}</td>
      <td>${String(value).slice(0, 80)}</td>
      <td class="actions">
        <button data-edit-key="${key}" data-edit-value="${String(value).replace(/"/g, '&quot;')}">Editar</button>
        <button class="danger" data-delete-key="${key}">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderPartners(items) {
  const list = document.getElementById('partnerList');
  list.innerHTML = '';

  items.forEach((partner) => {
    const id = partner.id || partner._id;
    const name = partner.name || partner.title || 'Parceiro';
    const logoUrl = partner.logoUrl || partner.logo || partner.imageUrl || '';

    const li = document.createElement('li');
    li.className = 'list-item';
    li.innerHTML = `
      <div>
        <strong>${name}</strong><br>
        <small>${logoUrl}</small>
      </div>
      <button class="danger" data-partner-id="${id}">Excluir</button>
    `;
    list.appendChild(li);
  });
}

function renderUsers(items) {
  const list = document.getElementById('userList');
  list.innerHTML = '';

  items.forEach((user) => {
    const id = user.id || user._id;
    const name = user.name || user.fullName || 'Usuário';
    const email = user.email || '-';
    const role = user.role || 'admin';

    const li = document.createElement('li');
    li.className = 'list-item';
    li.innerHTML = `
      <div>
        <strong>${name}</strong> (${role})<br>
        <small>${email}</small>
      </div>
      <div class="actions">
        <button data-user-edit='${JSON.stringify({ id, name, email, role }).replace(/'/g, '&apos;')}'>Editar</button>
        <button class="danger" data-user-id="${id}">Excluir</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function loadContent() {
  try {
    const payload = await Api.getAllContent();
    renderContentRows(unwrapArray(payload));
  } catch (error) {
    setStatus('contentStatus', error.message, 'error');
  }
}

async function loadPartners() {
  try {
    const payload = await Api.getPartners();
    renderPartners(unwrapArray(payload));
  } catch (error) {
    setStatus('partnerStatus', error.message, 'error');
  }
}

async function loadUsers() {
  try {
    const payload = await Api.getUsers();
    renderUsers(unwrapArray(payload));
  } catch (error) {
    setStatus('userStatus', error.message, 'error');
  }
}

function setupTabs() {
  document.querySelectorAll('[data-tab-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tabTarget;
      document.querySelectorAll('.tab-content').forEach((section) => section.classList.add('hidden'));
      document.getElementById(target).classList.remove('hidden');
      document.querySelectorAll('.tab-btn').forEach((tab) => tab.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  Auth.requireAuth();
  setupTabs();

  document.getElementById('logoutBtn').addEventListener('click', () => Auth.logout());

  document.getElementById('contentForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const key = event.target.key.value.trim();
    const value = event.target.value.value;
    const isUpdate = event.target.dataset.mode === 'update';

    try {
      if (isUpdate) {
        await Api.updateContent(key, { value });
      } else {
        await Api.createContent({ key, value });
      }
      setStatus('contentStatus', 'Conteúdo salvo com sucesso.', 'success');
      event.target.reset();
      event.target.dataset.mode = 'create';
      loadContent();
    } catch (error) {
      setStatus('contentStatus', error.message, 'error');
    }
  });

  document.getElementById('contentTableBody').addEventListener('click', async (event) => {
    if (event.target.dataset.editKey) {
      const form = document.getElementById('contentForm');
      form.key.value = event.target.dataset.editKey;
      form.value.value = event.target.dataset.editValue;
      form.dataset.mode = 'update';
      return;
    }

    if (event.target.dataset.deleteKey) {
      try {
        await Api.deleteContent(event.target.dataset.deleteKey);
        setStatus('contentStatus', 'Conteúdo removido.', 'success');
        loadContent();
      } catch (error) {
        setStatus('contentStatus', error.message, 'error');
      }
    }
  });

  document.getElementById('imageUploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const file = event.target.imageFile.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('imageFile', file);

    try {
      const response = await Api.uploadImage(formData);
      setStatus('contentStatus', `Imagem enviada. URL: ${response.url || response.path || 'ok'}`, 'success');
      event.target.reset();
    } catch (error) {
      setStatus('contentStatus', error.message, 'error');
    }
  });

  document.getElementById('partnerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', event.target.name.value);
    if (event.target.website.value) formData.append('website', event.target.website.value);
    if (event.target.logoFile.files[0]) formData.append('logoFile', event.target.logoFile.files[0]);

    try {
      await Api.createPartner(formData);
      setStatus('partnerStatus', 'Parceiro criado com sucesso.', 'success');
      event.target.reset();
      loadPartners();
    } catch (error) {
      setStatus('partnerStatus', error.message, 'error');
    }
  });

  document.getElementById('partnerList').addEventListener('click', async (event) => {
    const id = event.target.dataset.partnerId;
    if (!id) return;
    try {
      await Api.deletePartner(id);
      setStatus('partnerStatus', 'Parceiro removido.', 'success');
      loadPartners();
    } catch (error) {
      setStatus('partnerStatus', error.message, 'error');
    }
  });

  document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = event.target.userId.value;
    const payload = {
      name: event.target.name.value,
      email: event.target.email.value,
      role: event.target.role.value
    };

    if (event.target.password.value) payload.password = event.target.password.value;

    try {
      if (id) {
        await Api.updateUser(id, payload);
        setStatus('userStatus', 'Usuário atualizado.', 'success');
      } else {
        await Api.createUser(payload);
        setStatus('userStatus', 'Usuário criado.', 'success');
      }
      event.target.reset();
      loadUsers();
    } catch (error) {
      setStatus('userStatus', error.message, 'error');
    }
  });

  document.getElementById('userList').addEventListener('click', async (event) => {
    if (event.target.dataset.userEdit) {
      const user = JSON.parse(event.target.dataset.userEdit.replace(/&apos;/g, "'"));
      const form = document.getElementById('userForm');
      form.userId.value = user.id;
      form.name.value = user.name;
      form.email.value = user.email;
      form.role.value = user.role;
      return;
    }

    const id = event.target.dataset.userId;
    if (!id) return;
    try {
      await Api.deleteUser(id);
      setStatus('userStatus', 'Usuário removido.', 'success');
      loadUsers();
    } catch (error) {
      setStatus('userStatus', error.message, 'error');
    }
  });

  loadContent();
  loadPartners();
  loadUsers();
});
