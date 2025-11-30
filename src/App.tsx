import { TodoForm } from "./components/TodoForm";
import { TodoHeader } from "./components/TodoHeader";
import { TodoList } from "./components/TodoList";
import { TodoContainer } from "./components/TodoContainer";
import { useTodo } from "./components/hooks/useTodo";

function App() {

  const { addTodo, filteredTodos, toggleTodoCompleted, setFilter, filter, clearCompleted, removeTask } = useTodo();

  return (
    <TodoContainer>
      <TodoHeader />
      <TodoForm addTodo={addTodo}></TodoForm>
      <TodoList todoList={filteredTodos} toggleTodoCompleted={toggleTodoCompleted} setFilter={setFilter} filter={filter} clearCompleted={clearCompleted} removeTask={removeTask}/>
    </TodoContainer>
  )
}

export default App
