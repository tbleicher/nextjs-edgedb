import { Dispatch, SetStateAction } from "react";
import { TaskFilterOption } from "../../types/todo";

import styles from "./TodosListFilter.module.css";

interface TodosListFilterProps {
  filter: TaskFilterOption;
  setFilter: Dispatch<SetStateAction<TaskFilterOption>>;
}

export function TodosListFilter({ filter, setFilter }: TodosListFilterProps) {
  return (
    <ul className={styles.filters}>
      <li>
        <a
          style={{ cursor: "pointer" }}
          className={filter === "all" ? "selected" : undefined}
          onClick={() => setFilter("all")}
        >
          All
        </a>
      </li>
      <li>
        <a
          style={{ cursor: "pointer" }}
          className={filter === "active" ? "selected" : undefined}
          onClick={() => setFilter("active")}
        >
          Active
        </a>
      </li>
      <li>
        <a
          style={{ cursor: "pointer" }}
          className={filter === "completed" ? "selected" : undefined}
          onClick={() => setFilter("completed")}
        >
          Completed
        </a>
      </li>
    </ul>
  );
}
