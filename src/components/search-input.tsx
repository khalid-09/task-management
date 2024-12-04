import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { SidebarTrigger } from './ui/sidebar';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Initialize the search query from URL on mount
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Update the URL search parameters
    setSearchParams({ search: query });
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="w-full flex items-center mr-1 md:mr-0 gap-3">
      <SidebarTrigger />
      <div className="md:w-1/3">
        <div className="relative">
          <Input
            ref={inputRef}
            id="search"
            className="peer bg-background ps-9"
            placeholder="Search Title."
            value={searchQuery}
            onChange={handleSearchChange}
            autoComplete="off"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Search size={16} strokeWidth={2} aria-hidden="true" />
          </div>
          <span className="pointer-events-none hidden absolute inset-y-0 end-0 md:flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
            Ctrl ( ⌘ ) + k
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
