import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

import { useState } from "react";
import { useQuery } from "react-query";

import axios from "axios";

import { TodosList } from "./TodosList";
import { Task, TaskFilterOption } from "../../types/todo";
import { TodosCounter } from "./TodosCounter";
import { TodosListFilter } from "./TodosListFilter";
import { AddTodoInput } from "./AddTodoInput";

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

type TasksListQueryState = {
  isLoading: boolean;
  refetchTasks: () => {};
  tasks: Task[];
};

function useTasksList(): TasksListQueryState {
  const allTasks = useQuery<Task[]>("todos", () => axios.get("/api/todo").then((res) => res.data));

  return {
    isLoading: allTasks.isLoading,
    refetchTasks: allTasks.refetch,
    tasks: allTasks.data || [],
  };
}

export function TodosApp() {
  const { isLoading, refetchTasks, tasks } = useTasksList();

  const [filter, setFilter] = useState<TaskFilterOption>("all");
  const filteredTasks: Task[] = tasks.filter(filterTasksByStatus(filter));

  if (isLoading)
    return (
      <section className="todoapp">
        <div>Loading...</div>
      </section>
    );

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <AddTodoInput refetchTasks={refetchTasks} />
      </header>

      <TodosList refetchTasks={refetchTasks} tasks={filteredTasks} />

      <footer className="footer">
        <TodosCounter tasks={tasks} />
        <TodosListFilter filter={filter} setFilter={setFilter} />
      </footer>
    </section>
  );
}
