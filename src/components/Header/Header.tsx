import Link from "next/link";
import styles from "./Header.module.scss";
import { useTheme } from "@/lib/ThemeContext";
import DarkIcon from "../ThemeIcon/DarkIcon";
import LightIcon from "../ThemeIcon/LightIcon";
import { useEffect, useState } from "react";
import CartIcon from "../CartIcon";
import { useCart } from "@/lib/CartContext";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    if (theme === "light") {
      setChecked(true);
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setChecked((prev) => !prev);

    console.log(theme);

    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };

  useEffect(() => {
    if (cart.length < 0) return;
    setCartCount(cart.length);
  }, [cart]);

  return (
    <nav className={styles.nav}>
      <Link href={"/"}>Home</Link>
      <Link href={"/search"}>Search</Link>
      <Link href={"/cart"} className={styles.cart}>
        <span>{cartCount}</span>
        <CartIcon color={theme === "dark" ? "#c8c8c8" : "#525252"} />
      </Link>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChangeTheme}
        />
        <div className={styles.toggleBtn}>
          {theme === "dark" ? <DarkIcon /> : <LightIcon />}
        </div>
        <div className={styles.darkIcon}>
          <DarkIcon color="#c8c8c8" />
        </div>
        <div className={styles.lightIcon}>
          <LightIcon color="#525252" />
        </div>
      </label>
    </nav>
  );
}
