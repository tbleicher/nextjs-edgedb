import { useMutation } from "react-query";
import axios from "axios";

import { ListItem } from "./ListItem";
import { Task } from "../../types/todo";
import { onError } from "../../utils/api";

interface TodosListProps {
  refetchTasks: () => void;
  tasks: Task[];
}

export function TodosList({ tasks, refetchTasks }: TodosListProps) {
  const toggleTask = useMutation(
    (id: string) => {
      return axios.patch(`/api/todo/${id}`);
    },
    {
      onSuccess: refetchTasks,
      onError,
    }
  );

  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {tasks.map((task) => (
          <ListItem key={task.id} task={task} toggleTask={toggleTask.mutate} />
        ))}
      </ul>
    </section>
  );
}
