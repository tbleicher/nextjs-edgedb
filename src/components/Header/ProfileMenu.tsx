import React, { useState } from 'react';
import { Logout, Settings, Trash } from 'tabler-icons-react';

import { createStyles, Divider, Menu, UnstyledButton } from '@mantine/core';

import { useLogoutMutation } from '../../hooks/useLogoutMutation';
import { LoginMenuItem } from './LoginMenuItem';
import { ProfileButton } from './ProfileButton';

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },
  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
  userMenu: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

export function ProfileMenu() {
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { mutate: logout } = useLogoutMutation();

  return (
    <Menu
      size={260}
      placement="end"
      transition="pop-top-right"
      className={classes.userMenu}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      control={
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <ProfileButton />
        </UnstyledButton>
      }
    >
      <Menu.Label>Settings</Menu.Label>

      <Menu.Item icon={<Settings size={14} />}>Account settings</Menu.Item>
      <Menu.Item icon={<Logout size={14} />} onClick={() => logout()}>
        Logout
      </Menu.Item>

      <Divider />

      <Menu.Label>Change account</Menu.Label>

      <LoginMenuItem username="ada@a.example.com" />
      <LoginMenuItem username="andy@a.example.com" />
      <LoginMenuItem username="katherine@k.example.com" />
      <LoginMenuItem username="ken@k.example.com" />

      <Divider />

      <Menu.Label>Danger zone</Menu.Label>

      <Menu.Item color="red" disabled icon={<Trash size={14} />}>
        Delete account
      </Menu.Item>
    </Menu>
  );
}
