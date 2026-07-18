import { useEffect, useState, type FormEvent } from 'react';

export interface Todo {
  name: string;
  isCompleted: boolean;
}

const useTodo = () => {
  const todoInitial = async () => {
    const tarefasAPI = await fetch('http://localhost:3000/tasks');
    const response = await tarefasAPI.json();
    return response;
  };

  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await todoInitial();
      setTodoList(data.data);
    };

    loadTodos();
  }, []);

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const todoItem = formData.get('todo') as string;

    if (!todoItem.trim()) return;

    setTodoList((prev) => [
      ...prev,
      {
        name: todoItem,
        isCompleted: false,
      },
    ]);

    e.currentTarget.reset();

    setFilter('all');
  };

  const toggleTodoCompleted = (name: string) => {
    const newTodoList = todoList.map((todo) => {
      if (name === todo.name) {
        const completed = !todo.isCompleted;

        return {
          ...todo,
          completed,
        };
      }

      return todo;
    });

    setTodoList(newTodoList);
  };

  const filteredTodos = todoList.filter((todo) => {
    if (filter === 'active') return !todo.isCompleted;
    if (filter === 'completed') return todo.isCompleted;
    return true;
  });

  const clearCompleted = () => {
    setTodoList((prev) => prev.filter((todo) => !todo.isCompleted));
  };

  const removeTask = (name: string) => {
    setTodoList((prev) => prev.filter((todo) => todo.name !== name));
  };

  return {
    addTodo,
    toggleTodoCompleted,
    filteredTodos,
    setFilter,
    filter,
    clearCompleted,
    removeTask,
  };
};

export { useTodo };
