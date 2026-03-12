# 🎯 ZAIA Mini CMS - Guia Rápido

## ⚡ Acesso Rápido

| O que | Link |
|------|------|
| **Login Admin** | `/admin/login.html` |
| **Dashboard** | `/admin/dashboard.html` |
| **Landing Page** | `/index.html` |
| **Documentação Completa** | `INTEGRACAO_CMS.md` |

---

## 🔐 Primeiro Acesso

1. Abra: `http://seu-site/admin/login.html`
2. Use suas credenciais de administrador
3. Será redirecionado automaticamente para o dashboard

---

## 📊 Funcionalidades do Painel

### 1. **Gerenciar Conteúdos** 📝
- **Listar:** Visualize todos os conteúdos em cards
- **Criar:** Clique em "Novo Conteúdo"
- **Editar:** Clique no botão "Editar" de qualquer conteúdo
- **Deletar:** Remova conteúdos que não usa mais

**Exemplos de chaves:**
- `hero_title` → Título do hero
- `about_text` → Texto sobre
- `services_description` → Descrição de serviços
- Crie as suas próprias chaves!

### 2. **Gerenciar Parceiros** 🤝
- **Listar:** Veja todos os parceiros com logos
- **Adicionar:** Clique em "Novo Parceiro"
  - Digite o nome da empresa
  - Faça upload da logo (PNG, JPG, etc)
- **Deletar:** Remova parceiros antigos

### 3. **Gerenciar Usuários** 👥
- **Listar:** Veja todos os usuários do sistema
- **Criar:** Clique em "Novo Usuário"
  - Nome completo
  - Email único
  - Senha
  - Função (user, editor, admin)
- **Editar:** Atualize dados de um usuário
- **Deletar:** Remova usuários

---

## 🔗 Integração com Landing Page

### Adicione a Landing Page:
```html
<!-- No final do index.html, antes de </body> -->
<script src="/admin/api.js"></script>
<script src="/js/dynamic-content-loader.js"></script>
```

### Use conteúdo dinâmico:
```html
<!-- Seu titulo será gerenciado pelo CMS -->
<h1 data-content="hero_title">Carregando...</h1>

<!-- Sua subtitle também -->
<p data-content="hero_subtitle">Carregando...</p>

<!-- Imagens dinâmicas -->
<img src="placeholder.png" data-image="hero_image" alt="Hero">

<!-- Parceiros automaticamente -->
<div data-partners="list" data-template="grid"></div>
```

Pronto! Agora cada coisa que colocou com `data-content` será gerenciada pelo CMS! 🎉

---

## 📋 Fluxo de Uso Típico

```
1. Login (/admin/login.html)
   ↓
2. Dashboard abre automaticamente
   ↓
3. Escolha a aba: Conteúdos | Parceiros | Usuários
   ↓
4. Clique em "Novo..." ou "Editar"
   ↓
5. Preencha o formulário
   ↓
6. Clique em "Salvar"
   ↓
7. Aguarde a confirmação de sucesso
   ↓
8. A landing page é atualizada automaticamente!
```

---

## 🖥️ API Base URL

```
https://zaia-uniformes-backend.onrender.com
```

Todos os endpoints estão integrados automaticamente no painel.

---

## 🔓 Logout

Clique no botão **"Sair"** na barra lateral esquerda do painel. Você será redirecionado para a página de login.

---

## ⚠️ Lembretes Importantes

- ✅ **Sempre faça logout** quando terminar de usar o painel
- ✅ **Não compartilhe suas credenciais** com outras pessoas
- ✅ **Use senhas fortes** para sua conta de administrador
- ✅ **Faça backup** de conteúdos importantes antes de deletar
- ✅ **Teste na landing page** após fazer alterações

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| "Conteúdo não carrega" | Abra a página novamente (F5) |
| "Erro de autenticação" | Faça login novamente |
| "Imagem não aparece" | Verifique se o arquivo existe |
| "Não consigo criar conteúdo" | Tente novamente ou limpe o cache |

---

## 📞 Documentação Completa

Para informações mais detalhadas, leia o arquivo:
```
INTEGRACAO_CMS.md
```

Ele contém exemplos de código, troubleshooting e mais informações técnicas.

---

**Seu CMS está pronto para usar! Divirta-se gerenciando seu site.** 😊
