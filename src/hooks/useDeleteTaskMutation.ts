import { useMutation } from "react-query";
import axios from "axios";

import { onError } from "../utils/api";

export const useDeleteTaskMutation = (refetchTasks: () => void) => {
  const mutate = useMutation(
    (id: string) => {
      return axios.delete(`/api/todo/${id}`);
    },
    {
      onSuccess: refetchTasks,
      onError,
    }
  );

  return mutate;
};
