import axios from "axios";
import { onError } from "../utils/api";
import { useMutation } from "react-query";

export const useMarkAllTasksCompletedMutation = (refetchTasks: () => void) => {
  const mutate = useMutation(
    () => {
      return axios.patch(`/api/todo/`);
    },
    {
      onSuccess: refetchTasks,
      onError,
    }
  );

  return mutate;
};
