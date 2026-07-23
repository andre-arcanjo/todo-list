import { type FormEvent } from 'react';

export interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface TasksAPIResponse {
  data: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TodoInputProps {
  addTodo: (e: FormEvent<HTMLFormElement>) => void;
}

export interface TodoContainerProps {
  children: React.ReactNode;
}

export interface TodoListProps {
  todoList: Task[];
  toggleTodoCompleted: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  filter: 'all' | 'active' | 'completed';
  clearCompleted: () => void;
  removeTask: (id: string) => void;
}
