<div align="center">

  # 🎓 Gerador de Certificados

  **Uma aplicação web reativa e moderna para criação, gestão e visualização de certificados digitais.**

  ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)

</div>

---

## 📌 Sobre o Projeto

O **Gerador de Certificados** é um sistema desenvolvido em Angular projetado para otimizar o fluxo de emissão, listagem e verificação individual de certificados. O projeto aplica boas práticas de arquitetura front-end, aproveitando o poder dos *Standalone Components*, tipagem estrita com *TypeScript* e roteamento dinâmico.

---

## 🚀 Funcionalidades Principais

- 📋 **Listagem Dinâmica:** Exibição clara e organizada de todos os certificados cadastrados.
- 🔍 **Visualização Detalhada:** Rota parametrizada (`/certificados/:id`) para consultar detalhes específicos de cada certificado.
- ➕ **Formulário de Emissão:** Interface intuitiva para registro de novos alunos e atividades.
- 🎨 **Interface Reativa:** Utilização de classes dinâmicas (`ngClass`) e navegação fluida com `RouterLink`.

---

## 🛠️ Tecnologias e Conceitos Utilizados

- **[Angular](https://angular.dev/):** Framework principal para a construção da interface SPA.
- **[TypeScript](https://www.typescriptlang.org/):** Garantia de tipagem segura com interfaces personalizadas.
- **Angular Router:** Gerenciamento de navegação e passagem de parâmetros via URL (`ActivatedRoute`).
- **Services e Dependency Injection:** Centralização e compartilhamento da regra de negócio/dados entre componentes.

---

## 📁 Estrutura do Projeto

```text
src/
 └── app/
      ├── _components/      # Componentes reutilizáveis (Navbar, Botões, etc.)
      ├── _services/        # Serviços para gestão de dados
      ├── interfaces/       # Definições de tipos e contratos TypeScript
      └── pages/            # Páginas e views principais da aplicação
