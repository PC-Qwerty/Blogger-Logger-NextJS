"use client";

import Link from "next/link";
import styles from "./signup.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { register } from "@/lib/actions";

export default function Sign_Up() {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();
  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Name" name="name" />
      <input type="text" placeholder="Username" name="username" />
      <input type="email" placeholder="Email ID" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirm_password"
      />
      <button>Register</button>
      {state?.error}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
}
