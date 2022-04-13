import { TaskFilterOption, TodosListFilter } from "./TodosListFilter";

import { AddTodoInput } from "./AddTodoInput";
import { ClearCompletedButton } from "./ClearCompletedButton";
import { Task } from "../../types/todo";
import { TodosCounter } from "./TodosCounter";
import { TodosList } from "./TodosList";
import styles from "./TodosApp.module.css";
import { useState } from "react";
import { useTasksList } from "../../hooks/useTasksList";

function filterTasksByStatus(status: TaskFilterOption) {
  return (task: Task): boolean => {
    if (status === "active") {
      return !task.completed;
    }
    if (status === "completed") {
      return task.completed;
    }

    // return true for all tasks
    return true;
  };
}

export function TodosApp() {
  const { isLoading, tasks } = useTasksList();

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
        <AddTodoInput />
      </header>

      <TodosList tasks={filteredTasks} />

      <footer id="tooter" className={styles.footer}>
        <TodosCounter tasks={tasks} />
        <TodosListFilter filter={filter} setFilter={setFilter} />
        <ClearCompletedButton tasks={tasks} />
      </footer>
    </section>
  );
}
