import { Icon } from "tabler-icons-react";

export type HeaderLink = {
  icon?: Icon;
  link: string;
  label: string;
  links?: { link: string; label: string }[];
};
