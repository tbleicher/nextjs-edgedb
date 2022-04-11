import { useState } from "react";
import { useQuery } from "react-query";

import axios from "axios";

import { AddTodoInput } from "./AddTodoInput";
import { ClearCompletedButton } from "./ClearCompletedButton";
import { Task, TaskFilterOption } from "../../types/todo";
import { TodosCounter } from "./TodosCounter";
import { TodosList } from "./TodosList";
import { TodosListFilter } from "./TodosListFilter";

import styles from "./TodosApp.module.css";

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

function useTasksList(): TasksListQueryState {
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

export function TodosApp() {
  const { isLoading, refetchTasks, tasks } = useTasksList();

  const [filter, setFilter] = useState<TaskFilterOption>("all");
  const filteredTasks: Task[] = tasks.filter(filterTasksByStatus(filter));

  if (isLoading)
    return (
      <section className={styles.todoapp}>
        <div>Loading...</div>
      </section>
    );

  return (
    <section className={styles.todoapp}>
      <header className="header">
        <h1 className={styles.title}>Todos</h1>
        <AddTodoInput refetchTasks={refetchTasks} />
      </header>

      <TodosList refetchTasks={refetchTasks} tasks={filteredTasks} />

      <footer id="tooter" className={styles.footer}>
        <TodosCounter tasks={tasks} />
        <TodosListFilter filter={filter} setFilter={setFilter} />
        <ClearCompletedButton tasks={tasks} />
      </footer>
    </section>
  );
}
