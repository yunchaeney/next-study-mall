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
  // 새로고침 및 url 직접 접근 시에도 테마를 유지하려면 로컬스토리지나 세션스토리지에 저장해서 사용해야 함
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
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
