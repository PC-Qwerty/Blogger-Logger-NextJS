"use client";
import Link from "next/link";
import styles from "./navlinks.module.css";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  item: { title: string; pathname: string };
  key: string;
};

export default function NavLinks({ item }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={item.pathname}
      key={item.title}
      className={`${styles.navlink} ${
        pathname === item.pathname && styles.active
      }`}
    >
      {item.title}
    </Link>
  );
}
