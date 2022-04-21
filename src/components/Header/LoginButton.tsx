import { Menu } from "@mantine/core";
import { SwitchHorizontal } from "tabler-icons-react";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function useLoginMutation(username: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return axios
        .post("/api/auth/login", {
          username,
          password: "password",
        })
        .then((data) => {
          return data?.data;
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

interface LoginButtonProps {
  username: string;
}

export function LoginButton({ username }: LoginButtonProps) {
  const { mutate: login } = useLoginMutation(username);

  const name = username.split("@")[0];
  const firstName = `${name[0].toUpperCase()}${name.slice(1)}`;

  return (
    <Menu.Item
      key={username}
      icon={<SwitchHorizontal size={14} />}
      onClick={() => login()}
    >
      {firstName}
    </Menu.Item>
  );
}
