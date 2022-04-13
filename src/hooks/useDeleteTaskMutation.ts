import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types/todo";
import axios from "axios";

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation(
    (id: string) => {
      return axios.delete(`/api/todo/${id}`);
    },
    {
      onMutate: async (id: string) => {
        await queryClient.cancelQueries("todos");

        const cachedTodos: Task[] =
          queryClient.getQueryData<Task[]>("todos") || [];

        // optimistically remove task from list
        queryClient.setQueryData<Task[]>(
          "todos",
          cachedTodos.filter((task) => task.id !== id)
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
