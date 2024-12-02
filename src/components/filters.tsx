import { Filter, SlidersVerticalIcon } from 'lucide-react';
import { Button } from './ui/button';

const Filters = () => {
  return (
    <div className="space-x-3 mr-3">
      <Button variant="outline">
        <SlidersVerticalIcon
          className="-ms-1 me-2 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Filter
      </Button>
      <Button variant="outline">
        <Filter
          className="-ms-1 me-2 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        Sort By
      </Button>
    </div>
  );
};

export default Filters;
