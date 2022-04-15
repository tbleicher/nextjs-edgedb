import {
  Burger,
  Container,
  Group,
  Header as MantineHeader,
  createStyles,
  Button,
} from "@mantine/core";

import { HeaderLink } from "./types";
import Image from "next/image";
import { MenuItem } from "./MenuItem";
import { ProfileButton } from "./ProfileButton";
import React from "react";
import { SubMenu } from "./SubMenu";
import { createStylesFromTheme } from "./styles";
import Link from "next/link";

const useStyles = createStyles(createStylesFromTheme);

interface HeaderProps {
  height?: number;
  links?: HeaderLink[];
  navbarOpen: boolean;
  toggleNavbar: () => void;
}

export function Header({
  height = 60,
  links = [],
  navbarOpen,
  toggleNavbar,
}: HeaderProps) {
  const { classes } = useStyles();

  const items = links.map((link) => {
    if (link.links?.length) {
      return <SubMenu key={link.link} classes={classes} link={link} />;
    }

    return <MenuItem key={link.link} className={classes.link} link={link} />;
  });

  return (
    <MantineHeader height={height}>
      <Container className={classes.inner} style={{ height }} fluid>
        <Group>
          <Burger
            opened={navbarOpen}
            onClick={() => toggleNavbar()}
            className={classes.burger}
            size="sm"
          />
          <Link href="/" passHref>
            <Button
              className={classes.logoButton}
              component="a"
              variant="subtle"
              size="lg"
            >
              <Image
                alt="company logo"
                src="/logoipsum-logo-17.svg"
                height={39}
                width={127}
              />
            </Button>
          </Link>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <ProfileButton />
      </Container>
    </MantineHeader>
  );
}
