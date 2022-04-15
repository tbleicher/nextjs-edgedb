import styles from "./Footer.module.css";
import { Footer as MantineFooter } from "@mantine/core";

interface FooterProps {
  height?: number;
  p?: string;
}

export function Footer({ height = 60, p = "md" }: FooterProps) {
  return (
    <MantineFooter height={height} p={p} className={styles.info}>
      <p>
        Created with <a href="http://edgedb.com">EdgeDB</a>
      </p>
      <p>
        Part of <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </MantineFooter>
  );
}
