# 🛒 Loja Virtual - Vue 3 + Vuetify 3 + Pinia + Vue Router

Aplicação web desenvolvida com **Vue.js 3** para gerenciamento de **produtos, carrinhos e usuários**, utilizando a **API FakeStore** como fonte de dados.

O projeto segue boas práticas de organização de componentes, uso de **Pinia** para gerenciamento de estado global, **Vue Router** para navegação e **Vuetify 3** para estilização.

---

## ✨ Funcionalidades

### 📦 Produtos

- Listar Produtos: exibição de todos os produtos com nome, preço e imagem.
- Criar Produto: formulário para cadastrar novos produtos (nome, descrição, preço, categoria e imagem).
- Editar Produto: alteração das informações de um produto existente.
- Detalhar Produto: página com informações detalhadas de um produto.
- Deletar Produto: exclusão de um produto da lista.

### 🛒 Carrinho

- Listar Itens: exibir os produtos adicionados ao carrinho.
- Adicionar Produto: incluir produtos no carrinho.
- Editar Quantidade: alterar a quantidade de itens.
- Remover Produto: exclusão de itens do carrinho.

### 👤 Usuários

- Listar Usuários: exibir todos os usuários registrados.
- Criar Usuário: formulário de cadastro com nome de usuário, e-mail e senha.
- Editar Usuário: atualização dos dados de um usuário.
- Detalhar Usuário: página com informações completas do usuário.
- Deletar Usuário: exclusão de usuários.

### 🔐 Autenticação

- Login de Usuário: autenticação via **nome de usuário e senha**.
- Sessão: gerenciamento de sessão com proteção de rotas para usuários autenticados.

---

## 🛠️ Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/) - Framework JavaScript principal
- [Vite](https://vitejs.dev/) - Build tool rápida e moderna
- [Vuetify 3](https://next.vuetifyjs.com/en/) - UI framework responsivo e moderno
- [Pinia](https://pinia.vuejs.org/) - Gerenciamento de estado global
- [Vue Router](https://router.vuejs.org/) - Navegação entre páginas
- [FakeStore API](https://fakestoreapi.com/docs) - API REST de produtos, carrinho e usuários

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js **>= 18**
- npm ou yarn ou pnpm

### Passos

```bash
# Clone o repositório
git clone https://github.com/jumatosk/desafio-tecnico-sesab

# Acesse a pasta do projeto
cd desafio-tecnico-sesab

# Instale as dependências
npm install
# ou
yarn install

# Rode o projeto
npm run dev

# Acesse no navegador
http://localhost:5173
```
