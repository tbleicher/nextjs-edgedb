import { HeaderLink } from "../components/Header/types";
import {
  Gauge,
  Adjustments,
  Movie,
  ClipboardCheck,
  Help,
} from "tabler-icons-react";

export const links: HeaderLink[] = [
  {
    icon: Gauge,
    link: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: ClipboardCheck,
    link: "/todo",
    label: "Todos",
  },
  {
    icon: Movie,
    link: "/movies",
    label: "Movies",
  },

  {
    icon: Adjustments,
    link: "/settings",
    label: "Settings",
    links: [
      {
        link: "#item1",
        label: "Item 1",
      },
      {
        link: "#item2",
        label: "Item 2",
      },
    ],
  },

  {
    icon: Help,
    link: "#2",
    label: "Support",
    links: [
      {
        link: "/about",
        label: "About",
      },
      {
        link: "/faq",
        label: "FAQ",
      },
      {
        link: "/contact",
        label: "Contact",
      },
    ],
  },

  // {
  //   label: "Releases",
  //   icon: CalendarStats,
  //   link: "/",
  //   links: [
  //     { label: "Upcoming releases", link: "/" },
  //     { label: "Previous releases", link: "/" },
  //     { label: "Releases schedule", link: "/" },
  //   ],
  // },
  //
  // { label: "Analytics", link: "/", icon: PresentationAnalytics },
  // { label: "Contracts", link: "/", icon: FileAnalytics },
  // { label: "Settings", link: "/", icon: Adjustments },
  //
  // {
  //   label: "Security",
  //   icon: Lock,
  //   link: "/",
  //   links: [
  //     { label: "Enable 2FA", link: "/" },
  //     { label: "Change password", link: "/" },
  //     { label: "Recovery codes", link: "/" },
  //   ],
  // },
];

export function useLinks(): HeaderLink[] {
  return links;
}
