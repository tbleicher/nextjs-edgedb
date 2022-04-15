import { ReactNode } from "react";
import { AppShell } from "../AppShell/AppShell";
import { useLinks } from "../../hooks/useLinks";

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

export function Layout({ children }: LayoutProps) {
  const links = useLinks();
  return <AppShell links={links}>{children}</AppShell>;
}
