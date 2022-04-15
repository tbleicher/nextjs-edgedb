import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.info}>
      {/* Change this out with your name and url ↓ */}
      <p>
        Created with <a href="http://edgedb.com">EdgeDB</a>
      </p>
      <p>
        Part of <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  );
}
