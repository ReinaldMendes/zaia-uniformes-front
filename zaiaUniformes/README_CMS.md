# 🎨 ZAIA Mini CMS - Sistema Completo de Administração

**Versão:** 1.0  
**Status:** ✅ Pronto para Produção  

---

## 📌 O Que Foi Implementado?

Um **sistema de administração (CMS) simples** que permite:

✅ **Autenticação Segura**
- Login com email e senha
- Token JWT para sessões
- Logout seguro

✅ **Gerenciamento de Conteúdos**
- Criar, ler, editar e deletar conteúdos
- Chaves customizáveis (ex: `hero_title`, `about_text`)
- Valores que refletem dinamicamente na landing page

✅ **Gerenciamento de Parceiros**
- Listar parceiros
- Criar parceiros com upload de logo
- Deletar parceiros

✅ **Gerenciamento de Usuários**
- Listar usuários
- Criar novos usuários
- Editar dados de usuários
- Deletar usuários
- Roles: user, editor, admin

✅ **Integração com Landing Page**
- Conteúdos dinâmicos usando `data-content`
- Imagens dinâmicas usando `data-image`
- Parceiros automáticos usando `data-partners`

---

## 📁 Estrutura de Diretórios

```
zaiaUniformes/
│
├── 📄 index.html                    (Sua landing page - atualize com data-content)
│
├── 📁 admin/                        ← NOVO: Sistema de administração
│   ├── 🔐 login.html               (Página de login)
│   ├── 📊 dashboard.html           (Painel admin)
│   ├── 🌐 api.js                   (Integração com API backend)
│   ├── 🔑 auth.js                  (Gerenciamento de autenticação)
│   └── ⚙️ admin.js                 (Lógica do painel)
│
├── 📁 js/
│   ├── script.js                    (Seus scripts)
│   └── 🆕 dynamic-content-loader.js (Carrega conteúdo dinâmico)
│
├── 📁 css/
│   └── style.css                    (Seus estilos)
│
├── 📚 GUIA_RAPIDO_CMS.md           (Guia rápido - COMECE AQUI!)
├── 📚 INTEGRACAO_CMS.md            (Guia detalhado)
├── 📚 CHECKLIST_IMPLEMENTACAO.md   (Checklist completo)
├── 📚 exemplos-uso-cms.js          (Exemplos de código)
└── 📚 README.md                    (Este arquivo)
```

---

## 🚀 Como Começar?

### 1️⃣ Teste o Sistema (Sem Mudanças na Landing Page)

Acesse: `http://localhost:8000/admin/login.html`

```
Email: seu-email@admin.com
Senha: sua-senha
```

Explore o dashboard e entenda como funciona!

### 2️⃣ Integre Scripts na Landing Page

No seu `index.html`, adicione **antes de `</body>`**:

```html
<!-- Scripts do CMS -->
<script src="/admin/api.js"></script>
<script src="/js/dynamic-content-loader.js"></script>

</body>
</html>
```

### 3️⃣ Use Conteúdo Dinâmico

Mude seus elementos:

```html
<!-- ANTES: -->
<h1>ZAIA - Elite em Uniformes Corporativos</h1>

<!-- DEPOIS: -->
<h1 data-content="hero_title">ZAIA - Elite em Uniformes Corporativos</h1>
```

### 4️⃣ Crie Conteúdos no Painel

1. Acesse: `/admin/dashboard.html`
2. Vá para **"Conteúdos"**
3. Clique **"Novo Conteúdo"**
4. Digite: Chave `hero_title` e Valor `Seu texto aqui`
5. Clique **"Salvar"**
6. Na landing page, veja o conteúdo aparecer! ✨

---

## 🎯 URLs Principais

| Descrição | URL |
|-----------|-----|
| **Landing Page** | `/index.html` |
| **Login Admin** | `/admin/login.html` |
| **Dashboard** | `/admin/dashboard.html` |

---

## 📖 Documentação

### Para Começar Rápido
👉 **Leia:** `GUIA_RAPIDO_CMS.md`

### Para Informações Completas
👉 **Leia:** `INTEGRACAO_CMS.md`

### Para Exemplos de Código
👉 **Veja:** `exemplos-uso-cms.js`

### Para Checklist de Implementação
👉 **Use:** `CHECKLIST_IMPLEMENTACAO.md`

---

## 🔧 API Backend

Base URL: `https://zaia-uniformes-backend.onrender.com`

### Endpoints Disponíveis

```javascript
// Autenticação
POST   /api/auth/login          // Login
GET    /api/auth/me             // Dados do usuário

// Conteúdos
GET    /api/content             // Listar todos
GET    /api/content/:key        // Obter por chave
POST   /api/content             // Criar
PUT    /api/content/:key        // Editar
DELETE /api/content/:key        // Deletar
POST   /api/content/upload/image // Upload de imagem

// Parceiros
GET    /api/partners            // Listar
POST   /api/partners            // Criar
DELETE /api/partners/:id        // Deletar

// Usuários
GET    /api/users               // Listar
POST   /api/users               // Criar
PUT    /api/users/:id           // Editar
DELETE /api/users/:id           // Deletar
```

**Autenticação:** Todas as rotas (exceto login) requerem header:
```
Authorization: Bearer TOKEN_JWT
```

---

## 💡 Exemplos de Uso

### Exemplo 1: Título Dinâmico

```html
<h1 data-content="hero_title">Carregando...</h1>
```

CMS: Chave `hero_title` → Valor `ZAIA - Elite em Uniformes`

### Exemplo 2: Imagem Dinâmica

```html
<img src="placeholder.png" data-image="hero_image" alt="Hero">
```

CMS: Chave `hero_image` → Valor `https://exemplo.com/imagem.png`

### Exemplo 3: Parceiros

```html
<div data-partners="list" data-template="grid"></div>
```

CMS: Crie parceiros na aba "Parceiros" com nome e logo

### Exemplo 4: HTML Dinâmico

```html
<footer data-content="footer_content" data-html="true"></footer>
```

CMS: Chave `footer_content` → Valor `<p>© 2024 ZAIA</p>`

---

## 🔐 Segurança

✅ **Autenticação JWT**
- Tokens seguros e com expiração
- Armazenados em localStorage

✅ **Proteção de Rotas**
- Dashboard requer login
- Redirecionamento automático

✅ **Headers de Segurança**
- Token enviado automaticamente
- Redirecionamento em caso de expiração

✅ **Validação de Entrada**
- Formulários validam dados
- Backend valida também

---

## 🐛 Troubleshooting

### "Conteúdo não carrega"
- Verifique se adicionou os scripts ao HTML
- Verifique se a chave existe no CMS
- Abra o console (F12) e procure erros

### "Erro de autenticação"
- Faça login novamente
- Limpe o cache do navegador
- Verifique suas credenciais

### "Imagens não aparecem"
- Verifique a URL da imagem
- Tente usar uma URL pública
- Verifique se o arquivo existe

Consulte `INTEGRACAO_CMS.md` para mais soluções!

---

## 📊 Arquivos JavaScript

### `admin/api.js` (200+ linhas)
Funções para comunicar com o backend:
- `login()`, `verifyAuth()`, `logout()`
- `getContent()`, `createContent()`, `updateContent()`, `deleteContent()`
- `getPartners()`, `createPartner()`, `deletePartner()`
- `getUsers()`, `createUser()`, `updateUser()`, `deleteUser()`
- `uploadImage()`

### `admin/auth.js` (50 linhas)
Funções de autenticação:
- `isAuthenticated()`, `requireAuth()`, `redirectIfAuthenticated()`
- `handleLogin()`, `handleLogout()`

### `admin/admin.js` (400+ linhas)
Lógica do dashboard:
- Carregamento de dados
- Renderização de listas
- Modais de formulários
- Gerenciamento de abas
- Eventos de click

### `js/dynamic-content-loader.js` (150+ linhas)
Carregador de conteúdo:
- `loadDynamicContent()` - Carrega textos
- `loadDynamicImages()` - Carrega imagens
- `loadDynamicPartners()` - Carrega parceiros
- Executa ao carregar a página

---

## 📱 Responsivo?

✅ Sim! Todos os arquivos usam:
- Tailwind CSS (dashboard)
- CSS flexível (landing page)
- Media queries para mobile

Funciona em:
- Desktop ✅
- Tablet ✅
- Mobile ✅

---

## 🎨 Personalizações

### Mudar Cores

Edite as variáveis em `admin/dashboard.html`:

```css
:root {
    --primary: #1E3A5F;      // Azul escuro
    --secondary: #2F5F8F;    // Azul médio
    --accent: #D4AF37;       // Ouro
}
```

### Mudar Logo

No arquivo `admin/dashboard.html`, procure:

```html
<h2>ZAIA</h2>
```

E mude conforme desejar.

### Mudar Textos

Procure por strings em português e customize!

---

## 📈 Performance

- ✅ Carregamento assíncrono (não bloqueia o site)
- ✅ Cache eficiente (localStorage)
- ✅ Requisições otimizadas
- ✅ Sem dependências externas (exceto fetch)

---

## 🎓 O Que Você Aprendeu

✅ Como fazer autenticação com JWT  
✅ Como consumir APIs RESTful  
✅ Como criar um painel de administração  
✅ Como integrar conteúdo dinâmico  
✅ Como gerenciar dados no frontend  
✅ Como usar localStorage  
✅ Como criar modais com HTML/CSS  

---

## 🚀 Próximos Passos (Opcional)

1. **Implemente em Produção**
   - Configure domínio
   - Use HTTPS
   - Configure variáveis de ambiente

2. **Melhore o Design**
   - Customize cores
   - Adicione seu logo
   - Ajuste espaçamentos

3. **Adicione Funcionalidades**
   - Busca
   - Filtros
   - Paginação
   - Histórico

4. **Melhore a Segurança**
   - Implemente 2FA
   - Rate limiting
   - CORS restrito

---

## 📞 Suporte

Dúvidas? Consulte:

1. `GUIA_RAPIDO_CMS.md` → Resposta rápida
2. `INTEGRACAO_CMS.md` → Resposta detalhada
3. `CHECKLIST_IMPLEMENTACAO.md` → Troubleshooting
4. Console do navegador (F12) → Erros técnicos

---

## ✨ Conclude

Você tem um **CMS profissional, funcional e pronto para produção**! 

Parabéns! 🎉

---

## 📋 Resumo Rápido

```
1. Scripts no HTML:
   <script src="/admin/api.js"></script>
   <script src="/js/dynamic-content-loader.js"></script>

2. Elementos dinâmicos:
   <h1 data-content="chave">Texto padrão</h1>

3. Login:
   /admin/login.html

4. Dashboard:
   /admin/dashboard.html

5. Criar conteúdo:
   Click "Novo Conteúdo" → Digite chave e valor → Salvar
```

Simples assim! 😊

---

**Versão:** 1.0  
**Última atualização:** 12 de março de 2026  
**Desenvolvedor:** Seu Nome Aqui  
**Status:** ✅ Production Ready
