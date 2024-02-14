import Image from "next/image";
import styles from "./contact.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// export const metadata = {
//   title: "Contact Page",
//   description: "Contact description",
// };
// const HydrationTestNoSSR = dynamic(
//   () => import("@/components/HydrationTest"),
//   { ssr: false }
// );

export const metadata = {
  title: "Contact us",
  description: "Contact description",
};

export default function Contact() {
  // {// using "use client" the component first run on server then on client thus sometimes problems with hydration occurs which causes the components rendered by client and server may be different like from the example below
  // // const a = Math.random(); gives different values with server and client renders
  // // to fix this useState and useEfect can be used as one of the methods
  // // const [isClient, setIsClient] = useState(false);
  // // useEffect(() => {
  // //   setIsClient(true);
  // // }, []);
  // // 2nd method : to prevent the problem by disabling server side rendering on specific components
  // // by making a component which needs to be no SSR importing not directly but a dynamic way with nextjs as ...
  // // 3rd method : <div suppressHydrationWarning>{a}</div>
  // // const a = Math.random();
  // // console.log(a);}
  return (
    <div className={styles.container}>
      {/* {isClient && a} */}
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        {/* <HydrationTestNoSSR /> */}
        {/* <div suppressHydrationWarning>{a}</div> */}
        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}
