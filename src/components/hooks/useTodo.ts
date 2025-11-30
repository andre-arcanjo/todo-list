import { useState, type FormEvent } from "react";

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
};

const useTodo = () => {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const addTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const todoItem = formData.get('todo') as string;

        if (!todoItem.trim()) return;

        setTodoList(prev => [...prev, {
            id: Date.now(),
            text: todoItem,
            completed: false
        }]);

        e.currentTarget.reset();

        setFilter('all');
    }

    const toggleTodoCompleted = (id: number) => {
        const newTodoList = todoList.map(todo => {
            if (id === todo.id) {
                const completed = !todo.completed;

                return {
                    ...todo,
                    completed,
                };
            }

            return todo;
        });

        setTodoList(newTodoList);
    }

    const filteredTodos = todoList.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    });

    const clearCompleted = () => {
        setTodoList((prev) => prev.filter((todo) => !todo.completed));
    };

    const removeTask = (id: number) => {
        setTodoList((prev) => prev.filter(todo => todo.id !== id));
    }

    return {
        addTodo,
        toggleTodoCompleted,
        filteredTodos,
        setFilter,
        filter,
        clearCompleted,
        removeTask
    };
}

export { useTodo };