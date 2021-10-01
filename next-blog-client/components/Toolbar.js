import { useRouter } from "next/router";
import styles from "../styles/Toolbar.module.css";

export const Toolbar = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div onClick={() => router.push("/")}>one</div>
      <div
        onClick={() => (window.location.href = "https://github.com/ErikAstrom")}
      >
        Github
      </div>
      <div>Posts</div>
    </div>
  );
};

export default Toolbar;
