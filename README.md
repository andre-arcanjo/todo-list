# Todo List (Frontend)

Aplicação frontend para gerenciamento de tarefas (to-do list), permitindo criar, listar, atualizar e remover tarefas, além de filtrar por status.

---

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- TailwindCSS
- Fetch API

---

##  Funcionalidades

-  Criar tarefas
-  Listar tarefas
-  Marcar como concluída / pendente
-  Remover tarefa
-  Limpar tarefas concluídas
-  Filtrar por:
  - Todas
  - Ativas
  - Concluídas

---

## Estrutura do projeto

src/
├── components/
│ ├── TodoContainer/
│ ├── TodoForm/
│ ├── TodoHeader/
│ └── TodoList/
├── contexts/
│ └── ThemeContext
├── hooks/
│ └── useTask.ts
├── services/
│ ├── api.ts
│ └── taskService.ts
├── styles/
├── types/
├── App.tsx
└── main.tsx
---

##  Integração com API

A aplicação consome uma API REST rodando localmente:

````md
http://localhost:3000