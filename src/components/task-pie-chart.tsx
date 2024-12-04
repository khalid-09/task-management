import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; // Adjust this import based on your store setup

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMemo, useState } from 'react';

const chartConfig = {
  todo: {
    label: 'To Do',
    color: 'hsl(var(--chart-1))',
  },
  'in-progress': {
    label: 'In Progress',
    color: 'hsl(var(--chart-5))',
  },
  done: {
    label: 'Completed',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export default function TaskPieChart() {
  const id = 'task-status-pie';
  const tasks = useSelector((state: RootState) => state.tasks);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'long' })
  );

  const monthlyData = useMemo(() => {
    const months = [
      ...new Set(
        tasks.map(task =>
          new Date(task.dueDate).toLocaleString('default', { month: 'long' })
        )
      ),
    ];
    return months.map(month => {
      const monthTasks = tasks.filter(
        task =>
          new Date(task.dueDate).toLocaleString('default', {
            month: 'long',
          }) === month
      );
      return {
        month,
        todo: monthTasks.filter(task => task.status === 'todo').length,
        'in-progress': monthTasks.filter(task => task.status === 'in-progress')
          .length,
        done: monthTasks.filter(task => task.status === 'done').length,
        total: monthTasks.length,
      };
    });
  }, [tasks]);

  const currentMonthData = useMemo(
    () =>
      monthlyData.find(data => data.month === selectedMonth) || {
        month: selectedMonth,
        todo: 0,
        'in-progress': 0,
        done: 0,
        total: 0,
      },
    [monthlyData, selectedMonth]
  );

  const pieData = useMemo(
    () => [
      {
        name: 'todo',
        value: currentMonthData.todo,
        fill: chartConfig.todo.color,
      },
      {
        name: 'in-progress',
        value: currentMonthData['in-progress'],
        fill: chartConfig['in-progress'].color,
      },
      {
        name: 'done',
        value: currentMonthData.done,
        fill: chartConfig.done.color,
      },
    ],
    [currentMonthData]
  );

  const activeIndex = useMemo(
    () => pieData.findIndex(item => item.value > 0),
    [pieData]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Task Status Chart</CardTitle>
          <CardDescription>
            Task distribution for {selectedMonth}
          </CardDescription>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a month"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {monthlyData.map(({ month }) => (
              <SelectItem
                key={month}
                value={month}
                className="rounded-lg [&_span]:flex"
              >
                <div className="flex items-center gap-2 text-xs">{month}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          {currentMonthData.total > 0 ? (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {currentMonthData.total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Tasks
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-muted-foreground">
                No tasks for {selectedMonth}
              </p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium">To Do</p>
            <p className="text-2xl font-bold">{currentMonthData.todo}</p>
          </div>
          <div>
            <p className="text-sm font-medium">In Progress</p>
            <p className="text-2xl font-bold">
              {currentMonthData['in-progress']}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Done</p>
            <p className="text-2xl font-bold">{currentMonthData.done}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
