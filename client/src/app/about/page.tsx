import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          Unleashing the Power of Productivity: Mastering Time Management in a
          Hyperconnected World.
        </h1>
        <p className={styles.desc}>
          Explore the latest time management techniques and productivity hacks
          to supercharge your efficiency. Our blog is your go-to resource for
          practical insights, empowering you to navigate the demands of modern
          life with ease. Unleash your productivity potential and transform the
          way you approach each day of web and software development services.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="About Image" fill className={styles.img} />
      </div>
    </div>
  );
}
