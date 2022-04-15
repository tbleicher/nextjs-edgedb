import React, { ReactNode, useState } from "react";
import { AppShell as MantineAppShell, useMantineTheme } from "@mantine/core";
import { Footer } from "../Footer/Footer";
import { links } from "../../hooks/useLinks";
import { Header } from "../Header/Header";
import { Navbar } from "../Navbar/Navbar";
import { HeaderLink } from "../Header/types";

interface AppShellProps {
  children: ReactNode | ReactNode[];
  links?: HeaderLink[];
}

export function AppShell({ children }: AppShellProps) {
  const theme = useMantineTheme();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <MantineAppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={<Navbar links={links} open={navbarOpen} />}
      footer={<Footer height={60} p="md" />}
      header={
        <Header
          links={links}
          navbarOpen={navbarOpen}
          toggleNavbar={toggleNavbar}
        />
      }
    >
      {children}
    </MantineAppShell>
  );
}
