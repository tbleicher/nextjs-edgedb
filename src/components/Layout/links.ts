import { HeaderLink } from "../Header/types";

export const links: HeaderLink[] = [
  {
    link: "/todo",
    label: "Todos",
  },
  {
    link: "/movies",
    label: "Movies",
  },
  {
    link: "#1",
    label: "Sub Menu",
    links: [
      {
        link: "#item1",
        label: "Item 1",
      },
      {
        link: "#item2",
        label: "Item 2",
      },
      {
        link: "#item3",
        label: "Item 3",
      },
      {
        link: "#item4",
        label: "Item 4",
      },
    ],
  },

  {
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
];
