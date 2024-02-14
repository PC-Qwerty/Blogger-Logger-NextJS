import Sign_Up from "@/components/Sign_Up/signUp";
import styles from "./signup.module.css";
import Image from "next/image";
import { handleGithubLogin } from "@/lib/actions";

export default function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>
            Register with Github
            <Image src="/github.svg" alt="Github_logo" width={24} height={24} />
          </button>
        </form>
        <Sign_Up />
      </div>
    </div>
  );
}
