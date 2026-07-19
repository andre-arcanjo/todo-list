import { useEffect, useState, type FormEvent } from 'react';

export interface Todo {
  id: string;
  name: string;
  isCompleted: boolean;
}

const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // buscar todas as tarefas
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');

      if (!response.ok) {
        throw new Error('Erro ao buscar as tarefas.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar tarefas.');
      throw error;
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTasks();
        setTodoList(data.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas');
      }
    };

    loadTodos();
  }, []);

  // adicionar tarefa
  const addTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const todoItem = formData.get('todo') as string;

    if (!todoItem.trim()) return;

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: todoItem,
          isCompleted: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar tarefa');
      }

      const data = await fetchTasks();
      setTodoList(data.data);

      form.reset();
      setFilter('all');
    } catch (error) {
      console.error(error);
    }
  };

  // alterar status da tarefa
  const putTask = async (id: string) => {
    try {
      const task = todoList.find((t) => t.id === id);
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
      setTodoList(data.data);
    } catch (error) {
      console.error('Erro ao alterar status da tarefa');
    }
  };

  const filteredTodos = todoList.filter((todo) => {
    if (filter === 'active') return !todo.isCompleted;
    if (filter === 'completed') return todo.isCompleted;
    return true;
  });

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: { id }
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar tarefa');
      }
      const data = await fetchTasks();
      setTodoList(data.data);
    } catch (error) {
      console.error('Erro ao deletar tarefa');
    }
  };

  const clearCompleted = () => {
    setTodoList((prev) => prev.filter((todo) => !todo.isCompleted));
  };

  return {
    addTodo,
    putTask,
    filteredTodos,
    setFilter,
    filter,
    clearCompleted,
    deleteTask,
  };
};

export { useTodo };
