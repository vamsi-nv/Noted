import { useEffect } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggler() {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="absolute right-5 bottom-5 dark:text-white dark:bg-neutral-900 p-3 rounded-full cursor-pointer transition-all duration-200">
      {theme === "dark" ? <Sun/> : <Moon/> }
    </button>
  );
}
