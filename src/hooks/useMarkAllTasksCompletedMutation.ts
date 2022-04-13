import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types/todo";
import axios from "axios";

export const useMarkAllTasksCompletedMutation = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation(
    () => {
      return axios.patch(`/api/todo/`);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries("todos");

        const cachedTodos: Task[] =
          queryClient.getQueryData<Task[]>("todos") || [];

        // set all tasks in cache to completed
        queryClient.setQueryData<Task[]>(
          "todos",
          cachedTodos.map((task) =>
            task.completed ? task : { ...task, completed: true }
          )
        );
      },
      onError: () => {
        // force reload from server by invalidating cache
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return mutate;
};
