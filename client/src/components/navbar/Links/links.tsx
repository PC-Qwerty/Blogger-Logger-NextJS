import Link from "next/link";
import NavLinks from "./Navlinks/navlinks";
export const links: {
  title: string;
  pathname: string;
}[] = [
  {
    title: "Home",
    pathname: "/",
  },
  {
    title: "About",
    pathname: "/about",
  },
  {
    title: "Contact",
    pathname: "/contact",
  },
  {
    title: "Blogs",
    pathname: "/blog",
  },
];

export default function Links() {
  return (
    <div className="flex gap-10 text-xl space-x-2 items-center shrink-0">
      {links.map((link) => (
        <NavLinks item={link} key={link.title} />
      ))}
    </div>
  );
}
