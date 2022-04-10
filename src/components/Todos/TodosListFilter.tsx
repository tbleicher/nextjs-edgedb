import { Dispatch, SetStateAction } from "react";
import { TaskFilterOption } from "../../types/todo";

interface TodosListFilterProps {
  filter: TaskFilterOption;
  setFilter: Dispatch<SetStateAction<TaskFilterOption>>;
}

export function TodosListFilter({ filter, setFilter }: TodosListFilterProps) {
  return (
    <ul className="filters">
      <li>
        <a
          style={{ cursor: "pointer" }}
          className={filter === "all" ? "selected" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </a>
      </li>
      <li>
        <a
          style={{ cursor: "pointer" }}
          className={filter === "active" ? "selected" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </a>
      </li>
      <li>
        <a
          style={{ cursor: "pointer" }}
          className={filter === "completed" ? "selected" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </a>
      </li>
    </ul>
  );
}
