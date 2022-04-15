import {
  Burger,
  Button,
  Container,
  Group,
  Header as MantineHeader,
  createStyles,
} from "@mantine/core";

import { HeaderLink } from "./types";
import Image from "next/image";
import { MenuItem } from "./MenuItem";
import { ProfileButton } from "./ProfileButton";
import React from "react";
import { SubMenu } from "./SubMenu";
import { createStylesFromTheme } from "./styles";
import { useBooleanToggle } from "@mantine/hooks";

const useStyles = createStyles(createStylesFromTheme);

interface HeaderProps {
  height?: number;
  links?: HeaderLink[];
}

export function Header({ height = 60, links = [] }: HeaderProps) {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);

  const items = links.map((link) => {
    if (link.links?.length) {
      return <SubMenu key={link.link} classes={classes} link={link} />;
    }

    return <MenuItem key={link.link} className={classes.link} link={link} />;
  });

  return (
    <MantineHeader height={height} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} style={{ height }} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <Image
            alt="company logo"
            src="/logoipsum-logo-17.svg"
            width={127}
            height={39}
          />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <ProfileButton />
      </Container>
    </MantineHeader>
  );
}
