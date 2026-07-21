import { useEffect, useState, type FormEvent } from 'react';
import type { Task } from '../../types';

const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');

      if (!response.ok) {
        throw new Error('Erro ao buscar as tarefas.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar tarefas.', error);
      throw error;
    }
  };

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
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: taskName,
          isCompleted: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar tarefa');
      }

      const data = await fetchTasks();
      setTasks(data.data);

      form.reset();
      setFilter('all');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskCompleted = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const updateStatus = !task.isCompleted;

      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isCompleted: updateStatus,
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar tarefa');
      }

      const data = await fetchTasks();
      setTasks(data.data);
    } catch (error) {
      console.error('Erro ao alterar status da tarefa', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar tarefa');
      }
      const data = await fetchTasks();
      setTasks(data.data);
    } catch (error) {
      console.error('Erro ao deletar tarefa', error);
    }
  };

  const deleteCompletedTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/completed`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isCompleted: true,
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar tarefas completas');
      }
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
    toggleTaskCompleted,
    deleteTask,
    deleteCompletedTasks,
  };
};

export { useTask };
