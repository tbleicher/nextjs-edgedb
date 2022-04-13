import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types/todo";
import axios from "axios";

export const useDeleteCompletedTasksMutation = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation(
    () => {
      return axios.delete(`/api/todo`);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries("todos");

        const cachedTodos: Task[] =
          queryClient.getQueryData<Task[]>("todos") || [];

        // remove completed tasks from cached list
        queryClient.setQueryData<Task[]>(
          "todos",
          cachedTodos.filter((task) => !task.completed)
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
