import React from 'react';
import { SwitchHorizontal } from 'tabler-icons-react';

import { Menu } from '@mantine/core';

import { useLoginMutation } from '../../hooks/useLoginMutation';

interface LoginMenuItemProps {
  username: string;
}

export function LoginMenuItem({ username }: LoginMenuItemProps) {
  const { mutate: login } = useLoginMutation();

  const name = username.split("@")[0];
  const firstName = `${name[0].toUpperCase()}${name.slice(1)}`;

  return (
    <Menu.Item
      key={username}
      icon={<SwitchHorizontal size={14} />}
      onClick={() => login({ username })}
    >
      {firstName}
    </Menu.Item>
  );
}
