import { Task } from "../types/todo";
import { TaskFilterOption } from "../components/Todos/TodosListFilter";
import axios from "axios";
import { useQuery } from "react-query";

type TasksListQueryState = {
  isLoading: boolean;
  refetchTasks: () => {};
  tasks: Task[];
};

type TaskSerialised = Omit<Task, "createdAt"> & {
  createdAt: string;
};

function filterTasksByStatus(status: TaskFilterOption) {
  return (task: Task): boolean => {
    if (status === "active") {
      return !task.completed;
    }
    if (status === "completed") {
      return task.completed;
    }
    return true;
  };
}

function sortByCreatedAt(a: Task, b: Task) {
  return b.createdAt.getTime() - a.createdAt.getTime();
}

export function useTasksList(): TasksListQueryState {
  const queryState = useQuery<TaskSerialised[], Error, Task[]>(
    "todos",
    () => axios.get("/api/todo").then((res) => res.data),
    {
      select: (tasks) => tasks.map((task) => ({ ...task, createdAt: new Date(task.createdAt) })),
    }
  );

  const tasks = queryState.data?.sort(sortByCreatedAt) || [];

  return {
    isLoading: queryState.isLoading,
    refetchTasks: queryState.refetch,
    tasks,
  };
}
