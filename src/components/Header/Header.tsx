import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <nav className={styles.nav}>
      <Link href={"/"}>Home</Link>
      <Link href={"/search"}>Search</Link>
      <Link href={"/setting"}>Setting</Link>
    </nav>
  );
}
