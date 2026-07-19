import { TodoForm } from "./components/TodoForm";
import { TodoHeader } from "./components/TodoHeader";
import { TodoList } from "./components/TodoList";
import { TodoContainer } from "./components/TodoContainer";
import { useTodo } from "./components/hooks/useTodo";

function App() {

  const { addTodo, filteredTodos, putTask, setFilter, filter, clearCompleted, deleteTask } = useTodo();

  return (
    <TodoContainer>
      <TodoHeader />
      <TodoForm addTodo={addTodo}></TodoForm>
      <TodoList todoList={filteredTodos} toggleTodoCompleted={putTask} setFilter={setFilter} filter={filter} clearCompleted={clearCompleted} removeTask={deleteTask}/>
    </TodoContainer>
  )
}

export default App
