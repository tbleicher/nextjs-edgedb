import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { ReactElement } from "react";
import { links } from "./links";

interface LayoutProps {
  children: ReactElement | ReactElement[];
}
export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header links={links} />
      {children}
      <Footer />
    </>
  );
}
