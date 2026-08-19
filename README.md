# Todo List (Frontend)

Interface web para gerenciamento de tarefas, desenvolvida com React e TypeScript. A aplicação consome uma API REST para criar, listar, atualizar e remover tarefas.

## Funcionalidades

- Criar e listar tarefas
- Marcar tarefas como concluídas ou pendentes
- Excluir uma tarefa individual
- Excluir todas as tarefas concluídas
- Filtrar tarefas por todas, ativas ou concluídas
- Alternar entre os temas claro e escuro
- Exibir mensagens de erro quando a comunicação com a API falhar
- Layout responsivo para dispositivos móveis e desktop

## Tecnologias utilizadas

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Fetch API
- ESLint

## Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) — versão 20 ou superior recomendada
- npm — incluído na instalação do Node.js
- A API do projeto configurada e em execução em `http://localhost:3000`

## Instalação

Clone o repositório:

```bash
git clone https://github.com/andre-arcanjo/todo-list.git
```

Acesse a pasta do projeto:

```bash
cd todo-list
```

Instale as dependências:

```bash
npm install
```

## Integração com o backend

O endereço da API está definido em `src/services/api.ts`:

```ts
export const API_BASE_URL = 'http://localhost:3000';
```

Antes de iniciar o frontend, execute o backend na porta `3000`. Caso a API esteja disponível em outro endereço, altere o valor de `API_BASE_URL`.

O frontend utiliza os seguintes endpoints:

| Método | Endpoint | Ação |
| --- | --- | --- |
| `GET` | `/tasks` | Lista as tarefas |
| `POST` | `/tasks` | Cria uma tarefa |
| `PUT` | `/tasks/:id` | Alterna o status de uma tarefa |
| `DELETE` | `/tasks/:id` | Exclui uma tarefa |
| `DELETE` | `/tasks/completed` | Exclui as tarefas concluídas |

## Execução em desenvolvimento

Com o backend em execução, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente `http://localhost:5173/todo-list/`.

## Build de produção

Para verificar os tipos e gerar os arquivos otimizados:

```bash
npm run build
```

O resultado será criado na pasta `dist/`.

Para visualizar localmente o build de produção:

```bash
npm run preview
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica os tipos e gera o build de produção |
| `npm run lint` | Executa a análise estática com ESLint |
| `npm run preview` | Executa localmente o build gerado |
| `npm run deploy` | Publica a pasta `dist` no GitHub Pages |

## Estrutura do projeto

```text
src/
├── components/
│   ├── TodoContainer/
│   ├── TodoForm/
│   ├── TodoHeader/
│   └── TodoList/
├── contexts/
│   ├── ThemeContext.tsx
│   └── theme.ts
├── hooks/
│   └── useTask.ts
├── services/
│   ├── api.ts
│   └── taskService.ts
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Qualidade do código

Antes de enviar alterações, execute:

```bash
npm run lint
npm run build
```
