import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types/todo";
import axios from "axios";

export const useToggleTaskMutation = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation(
    (id: string) => {
      return axios.patch(`/api/todo/${id}`);
    },
    {
      onMutate: async (id: string) => {
        await queryClient.cancelQueries("todos");

        const cachedTodos: Task[] =
          queryClient.getQueryData<Task[]>("todos") || [];

        // set all tasks in cache to completed
        queryClient.setQueryData<Task[]>(
          "todos",
          cachedTodos.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      },
      onError: () => {
        // force reload from server by invalidating cache
        queryClient.invalidateQueries("todos");
      },
      // onSuccess - no update required
    }
  );

  return mutate;
};
