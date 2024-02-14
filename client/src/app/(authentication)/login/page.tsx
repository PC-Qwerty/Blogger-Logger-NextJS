import { handleGithubLogin } from "@/lib/actions";
// import { auth } from "@/lib/auth";
import styles from "./login.module.css";
import LoginPage from "@/components/Login/login";
import Image from "next/image";

export default async function Login() {
  // const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>
            Login with Github
            <Image src="/github.svg" alt="Github_logo" width={24} height={24} />
          </button>
        </form>
        <LoginPage />
      </div>
    </div>
  );
}
