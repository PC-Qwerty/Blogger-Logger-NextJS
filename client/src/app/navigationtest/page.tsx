"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NavigationTestPage() {
  // client side navigation
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  console.log(pathname, query);
  const handleClick = () => {
    console.log("Clicked");
    router.push("/");
  };
  return (
    <div>
      {/* normally the below prefetches the page that is mentioned faster .... if there are many to prefetch the performance and memory usage might increase depeneding on the load of the page to make  prefetching not happen here prefetch is set to false */}
      <Link href="/" prefetch={false}>
        Click here
      </Link>
      <button onClick={handleClick}>Log and Redirect</button>
    </div>
  );
}
