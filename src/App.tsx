import { PlusIcon } from 'lucide-react';
import AppSidebar from './components/app-sidebar';
import Navbar from './components/navbar';
import { Button } from './components/ui/button';
import { SidebarProvider } from './components/ui/sidebar';
import NavTabs from './components/nav-tabs';
import Filters from './components/filters';

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full font-poppins">
        <Navbar />
        <div className="w-full border-t p-3 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Task View</h1>
          <Button>
            <PlusIcon
              className="-ms-1 me-2 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Add Task
          </Button>
        </div>
        <NavTabs />
      </div>
    </SidebarProvider>
  );
}
