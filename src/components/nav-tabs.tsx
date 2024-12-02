import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from './ui/button';
import { Filter, SlidersVerticalIcon } from 'lucide-react';

const NavTabs = () => {
  return (
    <section className="flex p-3 items-start justify-between">
      <Tabs defaultValue="kanban" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
          <div className="gap-1 md:gap-3 flex">
            <Button variant="outline">
              <SlidersVerticalIcon
                className="opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="md:block hidden">Filter</span>
            </Button>
            <Button variant="outline">
              <Filter
                className="opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="md:block hidden">Sort By</span>
            </Button>
          </div>
        </div>
        <TabsContent
          value="kanban"
          className="flex flex-col md:flex-row items-start gap-3"
        >
          <div className="border-dashed border size-[300px] h-[500px]">
            asljdfh
          </div>
          <div className="border size-[300px]">asjdfh</div>
          <div className="border size-[300px]">asljdfh</div>
        </TabsContent>
        <TabsContent value="list">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default NavTabs;
