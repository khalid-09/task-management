import { BellIcon, ClockIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import ThemeToggle from './theme-toggle';
import SearchInput from './search-input';

const Navbar = () => {
  return (
    <header className="flex bg-sidebar p-3 items-center justify-between w-full">
      <SearchInput />
      <div className="flex items-center gap-1 ,md:gap-2">
        <Button size="icon" variant="outline">
          <ClockIcon />
        </Button>
        <Button size="icon" variant="outline">
          <BellIcon />
        </Button>
        <ThemeToggle />
        <h4 className="text-sm md:block hidden ml-2 mr-2 leading-none font-semibold whitespace-nowrap">
          Welcome, Mr. John
        </h4>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Navbar;
