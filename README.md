<div align="center">

  # 🎓 Gerador de Certificados

  **Uma aplicação web reativa e moderna para criação, gestão e visualização de certificados digitais.**

  ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</div>

Aplicação Angular 22 para cadastrar cursos, emitir certificados, consultar o histórico e baixar a arte original em PNG.

## Executar localmente

Use o Node.js 24. Abra um terminal na raiz do projeto.

```sh
npm ci
npm run backend
```

Mantenha o backend em execução. Em outro terminal, na mesma pasta:

```sh
npm start
```

Acesse http://localhost:4200. O servidor Angular encaminha as chamadas de `/api` para o json-server em `http://127.0.0.1:3000`. Na primeira execução, o script copia os exemplos de `db.seed.json` para `db.json`. Os dois cadastros gravam no arquivo local `db.json`, que fica fora do Git.

- **Início** abre o formulário de emissão. Selecione um curso, confira a carga horária sugerida e adicione as atividades.
- **Certificados** permite visualizar, editar e excluir emissões. Na página do certificado, use **Download PNG** para exportar.
- **Cursos** permite criar, editar e excluir cursos. Certificados já emitidos conservam os dados de curso gravados na emissão.

Se houver registros da versão anterior na mesma origem do navegador, use **Importar histórico deste navegador** em **Certificados**. Os campos de curso e carga horária ficam em branco até serem preenchidos.

## Verificar o projeto

```sh
npm run build
npm test -- --watch=false
```

O proxy é aplicado pelo servidor de desenvolvimento. Uma implantação do build precisa encaminhar `/api` a um backend persistente.

## 📁 Estrutura do Projeto

```text
src/
 └── app/
      ├── _components/      # Componentes reutilizáveis (Navbar, Botões, etc.)
      ├── _services/        # Serviços para gestão de dados
      ├── interfaces/       # Definições de tipos e contratos TypeScript
      └── pages/            # Páginas e views principais da aplicação
