import { Center, Menu } from "@mantine/core";

import { ChevronDown } from "tabler-icons-react";
import { HeaderLink } from "./types";
import Link from "next/link";

interface SubMenuProps {
  classes: {
    link: string;
    linkLabel: string;
  };
  link: HeaderLink;
}

export function SubMenu({ classes, link }: SubMenuProps) {
  return (
    <Menu
      key={link.label}
      trigger="hover"
      delay={0}
      transitionDuration={0}
      placement="end"
      gutter={1}
      control={
        <a className={classes.link} onClick={(event) => event.preventDefault()}>
          <Center>
            <span className={classes.linkLabel}>{link.label}</span>
            <ChevronDown size={12} />
          </Center>
        </a>
      }
    >
      {link.links?.map((item: HeaderLink) => (
        <Link key={item.link} href={item.link} passHref>
          <a key={item.label}>
            <Menu.Item>{item.label}</Menu.Item>
          </a>
        </Link>
      ))}
    </Menu>
  );
}
