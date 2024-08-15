import { useTheme } from "@/lib/ThemeContext";

export default function Setting() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h1>설정</h1>
      <section>
        <h2>테마 설정</h2>

        <button
          type="button"
          className=""
          name="theme"
          onClick={() => setTheme("dark")}
        >
          다크테마
        </button>

        <button
          type="button"
          className=""
          name="theme"
          onClick={() => setTheme("light")}
        >
          라이트테마
        </button>
      </section>
    </div>
  );
}
