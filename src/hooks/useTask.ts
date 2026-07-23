import { useEffect, useState, type FormEvent } from 'react';
import type { Task } from '../types';
import {
  fetchTasks,
  createTaskRequest,
  toggleTaskRequest,
  deleteTaskRequest,
  deleteCompletedTasksRequest,
} from '../services/taskService';

const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [error, setError] = useState<string | null>(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar tarefas', error);
        setError(
          'Não foi possível carregar as tarefas. Tente novamente mais tarde.',
        );
      }
    };

    loadTasks();
  }, []);

  const createTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const taskName = formData.get('task') as string;

    if (!taskName.trim()) return;

    try {
      await createTaskRequest(taskName);

      const data = await fetchTasks();
      setTasks(data);
      setError(null);

      form.reset();
      setFilter('all');
    } catch (error) {
      console.error('Erro ao criar tarefa', error);
      setError('Não foi possível criar a tarefa. Tente novamente.');
    }
  };

  const toggleTask = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const updateStatus = !task.isCompleted;

      await toggleTaskRequest(id, updateStatus);

      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (error) {
      console.error('Erro ao alterar status da tarefa', error);
      setError('Não foi possível atualizar a tarefa. Tente novamente.');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskRequest(id);

      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (error) {
      console.error('Erro ao deletar tarefa', error);
      setError('Não foi possível excluir a tarefa. Tente novamente.');
    }
  };

  const deleteCompletedTasks = async () => {
    try {
      await deleteCompletedTasksRequest();

      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (error) {
      console.error('Erro ao deletar tarefas completas', error);
      setError(
        'Não foi possível excluir as tarefas completas. Tente novamente.',
      );
    }
  };

  return {
    filteredTasks,
    filter,
    setFilter,
    createTask,
    toggleTask,
    deleteTask,
    deleteCompletedTasks,
    error,
  };
};

export { useTask };
