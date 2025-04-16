# Alquimia Frames - Hackathon Frontend

Este projeto é o frontend da aplicação **Alquimia Frames**, desenvolvida para o hackathon da FIAP. A aplicação transforma vídeos em frames extraordinários utilizando tecnologias modernas.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida e moderna.
- **TailwindCSS**: Framework CSS utilitário para estilização.
- **Radix UI**: Componentes acessíveis e estilizados.
- **Lucide Icons**: Conjunto de ícones modernos e personalizáveis.
- **i18next**: Internacionalização e suporte a múltiplos idiomas.
- **AWS Amplify**: Configuração de autenticação e integração com serviços AWS.
- **Jest** e **Testing Library**: Testes unitários e de integração.
- **ESLint**: Linter para manter a qualidade do código.
- **Commitlint**: Validação de mensagens de commit.

## Deployment

- **O deploy da aplicação está sendo realizada na vercel.**
- Link para acessar o projeto:
  [Alquimia Frames](https://fiap-hackathon-frontend.vercel.app/signin)

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Como Rodar a Aplicação

Siga os passos abaixo para configurar e rodar o projeto localmente:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/fiap-hackathon-frontend.git
   cd fiap-hackathon-frontend
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   VITE_API_BASE_URL=https://api.com
   VITE_COGNITO_USER_POOL_ID=seu-user-pool-id
   VITE_COGNITO_CLIENT_ID=seu-client-id
   ```

4. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**:
   Abra o navegador e acesse [http://localhost:5173](http://localhost:5173).

## Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Gera a build de produção.
- `preview`: Visualiza a build de produção localmente.
- `test`: Executa os testes.
- `lint`: Verifica problemas de lint no código.

## Estrutura do Projeto

- **src/**: Código-fonte principal.
  - **core/**: Componentes e layouts reutilizáveis.
  - **modules/**: Módulos específicos da aplicação.
  - **shared/**: Componentes e utilitários compartilhados.
  - **infra/**: Configurações e integrações com serviços externos.
- **public/**: Arquivos estáticos.
- **tests/**: Testes unitários e de integração.
