import axios from 'axios';
import { useQuery } from 'react-query';

import { Task } from '../types/todo';

type TasksListQueryState = {
  isLoading: boolean;
  tasks: Task[];
};

type TaskSerialised = Omit<Task, "createdAt"> & {
  createdAt: string;
};

function sortByCreatedAt(a: Task, b: Task) {
  return b.createdAt.getTime() - a.createdAt.getTime();
}

export function useTasksList(): TasksListQueryState {
  const queryState = useQuery<TaskSerialised[], Error, Task[]>(
    ["todos"],
    () => axios.get("/api/todo").then((res) => res.data),
    {
      select: (tasks) =>
        tasks.map((task) => ({ ...task, createdAt: new Date(task.createdAt) })),
    }
  );

  const tasks = queryState.data?.sort(sortByCreatedAt) || [];

  return {
    isLoading: queryState.isLoading,
    tasks,
  };
}
