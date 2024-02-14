"use client";

import { useFormState } from "react-dom";
import styles from "./login.module.css";
import Link from "next/link";
import { login } from "@/lib/actions";

export default function LoginPage() {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Username" name="username" />
      <input type="text" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <button>Login</button>
      {state?.error}
      <Link href="/sign-up">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
}
