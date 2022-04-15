import React, { useState } from "react";
import { Collapse, UnstyledButton, createStyles } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";

import { HeaderLink } from "../Header/types";
import { NavbarLink } from "./NavbarLink";

const useStyles = createStyles((theme) => ({
  control: {
    display: "block",
    width: "100%",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

interface LinksGroupProps {
  link: HeaderLink;
}

export function LinksGroup({ link }: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);

  const ChevronIcon = theme.dir === "ltr" ? ChevronRight : ChevronLeft;

  if (!link.links || !link.links.length) {
    return <NavbarLink link={link} />;
  }

  return (
    <>
      <UnstyledButton
        onClick={(evt: React.SyntheticEvent) => {
          evt.preventDefault();
          setOpened((o) => !o);
        }}
        className={classes.control}
      >
        <NavbarLink link={link}>
          <ChevronIcon
            className={classes.chevron}
            size={14}
            style={{
              transform: opened
                ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                : "none",
            }}
          />
        </NavbarLink>
      </UnstyledButton>

      <Collapse in={opened}>
        {link.links.map((_link) => (
          <NavbarLink key={_link.label} link={_link} />
        ))}
      </Collapse>
    </>
  );
}
