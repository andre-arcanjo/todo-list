import { TodoForm } from './components/TodoForm';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoContainer } from './components/TodoContainer';
import { useTask } from './hooks/useTask';

function App() {
  const {
    createTask,
    filteredTasks,
    toggleTask,
    setFilter,
    filter,
    deleteCompletedTasks,
    deleteTask,
    error,
  } = useTask();

  return (
    <TodoContainer>
      <TodoHeader />
      <TodoForm addTodo={createTask}></TodoForm>
      <TodoList
        todoList={filteredTasks}
        toggleTodoCompleted={toggleTask}
        setFilter={setFilter}
        filter={filter}
        clearCompleted={deleteCompletedTasks}
        removeTask={deleteTask}
        errorMessage={error}
      />
    </TodoContainer>
  );
}

export default App;
