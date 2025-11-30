import { useContext } from "react";
import { themeConfig } from "../../contexts/theme";
import { ThemeContext } from "../../contexts/ThemeContext";
import type { Todo } from "../../components/hooks/useTodo";
import IconCheck from '/images/icon-check.svg';
import IconCross from '/images/icon-cross.svg'

interface TodoListProps {
  todoList: Todo[],
  toggleTodoCompleted: (id: number) => void,
  setFilter: (filter: 'all' | 'active' | 'completed') => void,
  filter: 'all' | 'active' | 'completed',
  clearCompleted: () => void,
  removeTask: (id: number) => void
}

const TodoList = ({ todoList, toggleTodoCompleted, setFilter, filter, clearCompleted, removeTask }: TodoListProps) => {

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`${themeConfig[theme].todo.backgroundColor} rounded-md`}>
        <ul>
          {todoList.map((todo) => (
            <li className={`p-6 border-b ${themeConfig[theme].todo.borderColor}`} key={todo.id}>
              <div className="flex items-center gap-4">
                <span className="h-6 w-6 rounded-full hover:bg-linear-to-r hover:from-check-background-start hover:to-check-background-end hover:p-px">
                  <button onClick={() => toggleTodoCompleted(todo.id)} className={`w-full h-full border ${themeConfig[theme].todo.borderColor} rounded-full cursor-pointer ${themeConfig[theme].todo.backgroundColor} ${todo.completed ? 'bg-linear-to-r from-check-background-start to-check-background-end' : ''}`}>
                    {todo.completed && <img src={IconCheck} alt="Icone de check" className="h-2 w-2 m-auto" />}
                  </button>
                </span>
                <div className=" w-full flex justify-between">
                <p className={`${themeConfig[theme].todo.textColor} ${todo.completed ? 'line-through opacity-50' : ''}`}>{todo.text}</p>
                <button onClick={() => removeTask(todo.id)} className="cursor-pointer">
                  <img src={IconCross} alt="Remover tarefa" />
                </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={`text-sm flex justify-between p-4 ${themeConfig[theme].layout.textColor}`}>
          <p>{todoList.length} items total</p>

          <div className="hidden sm:flex gap-4">
            <button onClick={() => setFilter('all')} className={`${filter === 'all' ? 'text-bright-blue' : ''} ${theme === 'dark' ? 'hover:text-neutral-light-grayish-blue' : 'hover:text-neutral-very-dark-grayish-blue'}`}>All</button>

            <button onClick={() => setFilter('active')} className={`${filter === 'active' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-neutral-light-grayish-blue-hover' : 'hover:text-neutral-very-dark-grayish-blue'}`}>Active</button>

            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-neutral-light-grayish-blue-hover' : 'hover:text-neutral-very-dark-grayish-blue'}`}>Completed</button>

          </div>

          <button onClick={clearCompleted} className={`cursor-pointer ${theme === 'dark' ? 'hover:text-neutral-light-grayish-blue-hover' : 'hover:text-neutral-very-dark-grayish-blue'}`}>Clear Completed</button>



        </div>
      </div>

      <div className={`${themeConfig[theme].todo.backgroundColor} ${themeConfig[theme].layout.textColor} flex justify-center gap-5 py-4 rounded-md mt-4 sm:hidden`}>
        <button onClick={() => setFilter('all')} className={`${filter === 'all' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-neutral-light-grayish-blue' : 'hover:text-neutral-very-dark-grayish-blue'}`}>All</button>

        <button onClick={() => setFilter('active')} className={`${filter === 'active' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-neutral-light-grayish-blue-hover' : 'hover:text-neutral-very-dark-grayish-blue'}`}>Active</button>

        <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-bright-blue' : ''} cursor-pointer ${theme === 'dark' ? 'hover:text-neutral-light-grayish-blue-hover' : 'hover:text-neutral-very-dark-grayish-blue'}`}>Completed</button>

      </div>
    </>
  )
}

export { TodoList };