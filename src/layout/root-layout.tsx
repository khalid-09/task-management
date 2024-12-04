import AppSidebar from '@/components/app-sidebar';
import Navbar from '@/components/navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full font-poppins">
        <Navbar />
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
