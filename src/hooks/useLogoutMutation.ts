import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return axios.post("/api/auth/logout");
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("profile");
      },
    }
  );

  return mutation;
}
