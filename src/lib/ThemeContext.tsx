import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const savedTheme = sessionStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // 사용자의 OS theme를 확인
      const isBrowserDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      let initTheme = isBrowserDarkMode ? "dark" : "light";

      setTheme(initTheme);
    }
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    sessionStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext 안에서 써야 합니다");
  }

  return themeContext;
}
