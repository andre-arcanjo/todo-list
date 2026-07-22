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

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas', error);
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
      setTasks(data.data);

      form.reset();
      setFilter('all');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const updateStatus = !task.isCompleted;

      await toggleTaskRequest(id, updateStatus);

      const data = await fetchTasks();
      setTasks(data.data);
    } catch (error) {
      console.error('Erro ao alterar status da tarefa', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskRequest(id);

      const data = await fetchTasks();
      setTasks(data.data);
    } catch (error) {
      console.error('Erro ao deletar tarefa', error);
    }
  };

  const deleteCompletedTasks = async () => {
    try {
      await deleteCompletedTasksRequest();

      const data = await fetchTasks();
      setTasks(data.data);
    } catch (error) {
      console.error('Erro ao deletar tarefas completas', error);
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
  };
};

export { useTask };
