"use client";

import { ReactElement, useState, ReactNode } from "react";
import NavLinks from "../Links/Navlinks/navlinks";
import { links } from "../Links/links";
import styles from "./mobilelinks.module.css";
import Image from "next/image";
import ThemeSwitch from "../ThemeSwitch";
import { handleGithubLogout } from "@/lib/actions";
import { renderToString } from "react-dom/server";

type MobileLinkProps = {
  isAdmin: boolean;
  session: any;
  username: string;
};

export default function MobileLinks({
  isAdmin,
  session,
  username,
}: MobileLinkProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.container} md:hidden`}>
      <div className={styles.subcontainer}>
        <ThemeSwitch />
        <button onClick={() => setOpen((prev) => !prev)}>
          <Image src="/menu.svg" alt="menu" width={25} height={25} />
        </button>
      </div>
      {open && (
        <div className={styles.mobilelinks}>
          <div className={styles.links_div}>
            {links.map((link) => (
              <NavLinks item={link} key={link.title} />
            ))}
          </div>
          <hr />
          {/* <div className={styles.bottom_info}> */}
          {session?.user ? (
            session?.user?.isAdmin ? (
              <div className="flex flex-col items-center justify-center">
                <NavLinks
                  item={{
                    // title: renderToString(
                    //   <>
                    //     <div className={styles.nav_user}>
                    //       <Image
                    //         src="/admin.png"
                    //         alt="user-image"
                    //         width={24}
                    //         height={24}
                    //       />
                    //       <span>{session?.user?.name || "Admin"}</span>
                    //     </div>
                    //   </>
                    // ),
                    title: session?.user?.name || "Admin",
                    pathname: "/admin",
                  }}
                  key="Admin"
                />
                <form action={handleGithubLogout}>
                  <button className="flex gap-2 cursor-pointer p-3 rounded-xl">
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
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src="/user.png"
                    alt="user-logo"
                    width={32}
                    height={28}
                  />
                  {session?.user.name}
                </div>
                <form action={handleGithubLogout}>
                  <button className="flex gap-2 cursor-pointer p-3 rounded-xl">
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
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
