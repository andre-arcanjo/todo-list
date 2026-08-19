import type { Task, TasksAPIResponse } from '../types';
import { API_BASE_URL } from './api';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks`);

  if (!response.ok) {
    throw new Error('Erro ao buscar as tarefas.');
  }

  const data: TasksAPIResponse = await response.json();
  return data.data;
};

export const createTaskRequest = async (name: string) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      isCompleted: false,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar tarefa');
  }
};

export const toggleTaskRequest = async (id: number, isCompleted: boolean) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isCompleted }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar tarefa');
  }
};

export const deleteTaskRequest = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar tarefa');
  }
};

export const deleteCompletedTasksRequest = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks/completed`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar tarefas completas');
  }
};
