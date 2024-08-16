import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./SearchForm.module.scss";

export default function SearchForm({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const router = useRouter();

  const [value, setValue] = useState<string>(initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!value) {
      router.push("/");
      return;
    }
    router.push(`/search?q=${value}`);
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        name="q"
        value={value}
        placeholder="ex) 후디"
        onChange={handleChange}
      />
      <button className={styles.searchButton}>검색</button>
    </form>
  );
}
