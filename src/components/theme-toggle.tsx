import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Button } from './ui/button';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button size="icon" variant="outline" onClick={handleClick}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeToggle;
