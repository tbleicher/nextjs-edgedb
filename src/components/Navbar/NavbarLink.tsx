import React, { FunctionComponent, ReactNode } from "react";
import { Group, Box, ThemeIcon, createStyles } from "@mantine/core";
import { IconProps } from "tabler-icons-react";
import Link from "next/link";
import { HeaderLink } from "../Header/types";

interface NavbarLinkProps {
  link: HeaderLink;
  children?: ReactNode | ReactNode[];
}

const useStyles = createStyles((theme) => ({
  link: {
    fontWeight: 500,
    display: "flex",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    cursor: "pointer",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export function NavbarLink({ link, children }: NavbarLinkProps) {
  const { classes } = useStyles();

  const Icon = link.icon as FunctionComponent<IconProps> | undefined;

  const iconAndLabel = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {Icon && (
        <ThemeIcon variant="light" size={30}>
          <Icon size={18} />
        </ThemeIcon>
      )}
      <Box ml={Icon ? "md" : 48}>{link.label}</Box>
    </Box>
  );

  // don't render Link if children (sub-links) are present
  if (children) {
    return (
      <Group className={classes.link} position="apart" spacing={0}>
        {iconAndLabel}
        {children}
      </Group>
    );
  }

  return (
    <Group className={classes.link} position="apart" spacing={0}>
      <Link href={link.link} key={link.label} passHref>
        {iconAndLabel}
      </Link>
    </Group>
  );
}
