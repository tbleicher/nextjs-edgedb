import { HeaderLink } from "./types";
import Link from "next/link";

interface MenuItemProps {
  className?: string;
  link: HeaderLink;
}

export function MenuItem({ className, link }: MenuItemProps) {
  return (
    <Link href={link.link} passHref>
      <a key={link.label} className={className}>
        {link.label}
      </a>
    </Link>
  );
}
