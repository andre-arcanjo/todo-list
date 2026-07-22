import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { themeConfig } from '../../contexts/theme';
import type { TodoContainerProps } from '../../types';

const TodoContainer = ({ children }: TodoContainerProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <main
      className={`min-h-screen ${themeConfig[theme].layout.backgroundColor}`}
    >
      <div
        className={`${themeConfig[theme].layout.heroClass} h-80 bg-cover bg-center`}
      ></div>
      <div className="max-w-175 m-auto px-8 pb-12 -mt-52">{children}</div>
    </main>
  );
};

export { TodoContainer };
