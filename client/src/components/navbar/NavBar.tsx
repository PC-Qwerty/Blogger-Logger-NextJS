import Image from "next/image";
import Links from "./Links/links";
import styles from "./navbar.module.css";
import NavLinks from "./Links/Navlinks/navlinks";
import MobileLinks from "./MobileLinks/mobilelinks";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { handleGithubLogout } from "@/lib/actions";
import { auth } from "@/lib/auth";

export default async function NavBar() {
  // const isAdmin = true;
  const session = await auth();
  // console.log(session?.user);
  // console.log(session);
  // const username = "Pavan";

  return (
    <div className={styles.navbar}>
      <div>
        <h1 className={styles.logo}>
          <Link href="/">Blogger Logger</Link>
        </h1>
      </div>
      <div className="hidden md:flex">
        <Links />
      </div>
      <div className={`hidden md:flex ${styles.subcontainer}`}>
        <ThemeSwitch />
        {session?.user ? (
          session?.user?.isAdmin ? (
            <div className="flex items-center gap-3">
              <NavLinks
                item={{
                  title: (
                    <>
                      <div className={styles.nav_user}>
                        <Image
                          src="/admin.png"
                          alt="user-image"
                          width={24}
                          height={24}
                        />
                        <span>{session?.user?.name || "Admin"}</span>
                      </div>
                    </>
                  ),
                  pathname: "/admin",
                }}
                key="Admin"
              />
              <form action={handleGithubLogout}>
                <button className="flex gap-2 cursor-pointer p-3 bg-white rounded-xl">
                  Logout
                  <Image
                    src="/logout.png"
                    alt="logout"
                    width={24}
                    height={24}
                  />
                </button>
              </form>
            </div>
          ) : (
            <div className={styles.userdetails}>
              <div className="flex items-center gap-2">
                <Image src="/user.png" alt="user-logo" width={32} height={28} />
                {session?.user.name}
              </div>
              <form action={handleGithubLogout}>
                <button className="flex gap-2 cursor-pointer p-3 bg-white rounded-xl">
                  Logout
                  <Image
                    src="/logout.png"
                    alt="logout"
                    width={24}
                    height={24}
                  />
                </button>
              </form>
            </div>
          )
        ) : (
          <NavLinks
            item={{ title: "Login", pathname: "/login" }}
            key={"Login"}
          />
        )}
      </div>
      <MobileLinks
        isAdmin={session?.user?.isAdmin}
        session={session}
        username={session?.user?.name || ""}
      />
    </div>
  );
}
