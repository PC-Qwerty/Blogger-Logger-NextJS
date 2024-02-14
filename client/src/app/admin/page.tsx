import { Suspense } from "react";
import styles from "./admin.module.css";
import { auth } from "@/lib/auth";
import AdminPosts from "@/components/AdminPosts/adminPosts";
import AdminPostForm from "@/components/AdminPostForm/adminPostForm";
import AdminUsers from "@/components/AdminUsers/adminUsers";
import AdminUserForm from "@/components/AdminUserForm/adminUserForm";

export default async function Admin() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminPostForm userId={session?.user?.id} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
}
