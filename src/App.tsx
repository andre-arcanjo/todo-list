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
      />
    </TodoContainer>
  );
}

export default App;
