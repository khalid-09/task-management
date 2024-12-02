import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { useEffect } from 'react';

const SearchInput = () => {
  useEffect(() => {
    const input = document.getElementById('search') as HTMLInputElement;
    input?.focus();
  }, []);

  return (
    <div className=" w-full flex items-center mr-1 md:mr-0 gap-3">
      <SidebarTrigger />
      <div className="md:w-1/3">
        <div className="relative">
          <Input
            id="search"
            className="peer bg-background ps-9"
            placeholder="Search Tasks."
            autoComplete="off"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Search size={16} strokeWidth={2} aria-hidden="true" />
          </div>
          <span className="pointer-events-none hidden absolute inset-y-0 end-0 md:flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
            ⌘ + k
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
