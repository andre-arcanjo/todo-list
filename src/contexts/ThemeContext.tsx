import { createContext, useState } from 'react';

type ThemeName = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeName;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => {}
});

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps ) => {
    
    const [theme, setTheme] = useState<ThemeName>('dark');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }
