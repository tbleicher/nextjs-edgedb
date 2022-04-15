import React from "react";
import { Divider, Navbar as MantineNavbar, ScrollArea } from "@mantine/core";

import { HeaderLink } from "../Header/types";

import { LinksGroup } from "./LinksGroup";
import { Logout } from "tabler-icons-react";
import { NavbarLink } from "./NavbarLink";

interface NavbarProps {
  links: HeaderLink[];
  open: boolean;
}

const logoutLink = {
  link: "/",
  label: "Logout",
  icon: Logout,
};

export function Navbar({ links, open }: NavbarProps) {
  return (
    <MantineNavbar
      hiddenBreakpoint="lg"
      hidden={!open}
      width={{ sm: 0, lg: 240 }}
    >
      <MantineNavbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {links.map((item) => (
          <LinksGroup key={item.label} link={item} />
        ))}
        <Divider />
        <NavbarLink link={logoutLink} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
