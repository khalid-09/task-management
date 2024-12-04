// import AppSidebar from './components/app-sidebar';
// import Navbar from './components/navbar';
// import { SidebarProvider } from './components/ui/sidebar';
// import NavTabs from './components/nav-tabs';
// import CreateTask from './components/create-task';
// import TaskPieChart from './components/task-pie-chart';
// import TaskMetrics from './components/task-metrics';
// import RecentTasks from './components/recent-task';

// export default function App() {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <div className="w-full font-poppins">
//         <Navbar />
//         <div className="flex flex-col md:flex-row">
//           <div className="mt-6 md:mt-0 p-3 md:w-2/3 w-full flex flex-col">
//             <div className="flex items-center justify-between">
//               <h1 className="text-3xl font-semibold">Task View</h1>
//               <CreateTask />
//             </div>
//             <NavTabs />
//           </div>
//           <div className="md:w-1/3 w-full pl-3 py-3 md:pl-0 pr-3 space-y-3">
//             <TaskPieChart />
//             <TaskMetrics />
//             <RecentTasks />
//           </div>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }

import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
