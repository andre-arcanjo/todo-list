import { useContext } from 'react';
import { themeConfig } from '../../contexts/theme';
import { ThemeContext } from '../../contexts/ThemeContext';

const TodoHeader = () => {

  const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <header className='flex justify-between p-5 items-center mb-6'>
          <h1 className='text-white text-4xl sm:text text-[2.5rem] font-bold tracking-[1rem]'>TODO</h1>

          <button className='cursor-pointer' onClick={toggleTheme}>
            <img className='h-8 w-8' src={`${themeConfig[theme].icon}`} alt="Alternar tema" />
          </button>
        </header>
    )
}

export { TodoHeader };