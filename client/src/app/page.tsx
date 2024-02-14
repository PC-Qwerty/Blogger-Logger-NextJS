import Image from "next/image";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Welcome to <span className="text-red-600">Blogger Logger!</span>
        </h1>
        <h2 className={styles.subtitle}>
          Explore a world of insights, tips, and inspiration to elevate your
          life and productivity.
        </h2>
        {/* <p className={styles.desc}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
          blanditiis adipisci minima reiciendis a autem assumenda dolore.
        </p> */}
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
      </div>
      <div className={`${styles.imgContainer} `}>
        <Image src="/hero.jpg" alt="" className={styles.heroImg} fill />
      </div>
    </div>
  );
}
