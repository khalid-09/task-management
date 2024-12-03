import AppSidebar from './components/app-sidebar';
import Navbar from './components/navbar';
import { SidebarProvider } from './components/ui/sidebar';
import NavTabs from './components/nav-tabs';
import CreateTask from './components/create-task';

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full font-poppins">
        <Navbar />
        <div className="border-t p-3 md:w-2/3 w-full flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Task View</h1>
          <CreateTask />
        </div>
        <NavTabs />
      </div>
    </SidebarProvider>
  );
}
