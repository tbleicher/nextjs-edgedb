import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({
      username,
      password = "password",
    }: {
      username: string;
      password?: string;
    }) => {
      return axios.post("/api/auth/login", {
        username,
        password,
      });
    },

    {
      onSuccess: (data) => {
        queryClient.setQueryData("profile", data);
      },
      onSettled: () => {
        queryClient.invalidateQueries("profile");
      },
    }
  );

  return mutation;
}
