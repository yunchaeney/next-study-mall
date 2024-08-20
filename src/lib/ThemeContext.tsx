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
      setTheme("dark"); // 기본값을 "dark"로 설정
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
