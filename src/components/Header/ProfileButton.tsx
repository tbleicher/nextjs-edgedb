import {
  Avatar,
  Divider,
  Group,
  Menu,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  ChevronDown,
  Settings,
  SwitchHorizontal,
  Trash,
  Logout,
} from "tabler-icons-react";
import React, { useState } from "react";

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

function useUser() {
  return {
    name: "User Name",
    image: "/avatar-svgrepo-com.svg",
  };
}
export function ProfileButton() {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = useUser();

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
          <Group spacing={7}>
            <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {user.name}
            </Text>
            <ChevronDown size={12} />
          </Group>
        </UnstyledButton>
      }
    >
      <Menu.Label>Settings</Menu.Label>

      <Menu.Item icon={<Settings size={14} />}>Account settings</Menu.Item>
      <Menu.Item icon={<Logout size={14} />}>Logout</Menu.Item>

      <Divider />

      <Menu.Label>Change account</Menu.Label>
      <Menu.Item icon={<SwitchHorizontal size={14} />}>Admin</Menu.Item>
      <Menu.Item icon={<SwitchHorizontal size={14} />}>Betty</Menu.Item>
      <Menu.Item icon={<SwitchHorizontal size={14} />}>Charly</Menu.Item>
      <Menu.Item icon={<SwitchHorizontal size={14} />}>Dory</Menu.Item>

      <Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item color="red" icon={<Trash size={14} />}>
        Delete account
      </Menu.Item>
    </Menu>
  );
}
