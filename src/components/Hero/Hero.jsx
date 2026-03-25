import styles from "./Hero.module.css";
import Button from "../UI/Button/Button.jsx";
import TextLine from "../UI/TextLine/TextLine.jsx";
import { easeInOut, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setOffsetY(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollHero() {
    window.scrollTo(0, window.innerHeight);
  }

  return (
    <header className={styles.hero}>
      <div
        className={styles.hero__background}
        style={{ transform: "translateY(" + offsetY * 0.5 + "px)" }}
      ></div>
      <div className={styles.hero__container}>
        <h1 className={styles.hero__caption}>
          Юридическое партнерство{<br />}"СТАТУС"
        </h1>
        <TextLine>
          Tantum possumus, quantum scimus (лат.) – мы можем столько, сколько
          знаем (Ф.Бэкон).
        </TextLine>
        <nav className={styles.hero__navcontainer}>
          <Button>Объявления</Button>
          <Button>Контакты</Button>
        </nav>
        <motion.svg
          animate={{ y: [0, -20] }}
          transition={{duration: 1, ease: easeInOut, repeat: Infinity, repeatType: "reverse"}}
          className={styles.hero__arrow}
          viewBox="0 0 38 19"
          onClick={scrollHero}
        >
          <path d="M19.208,18.592c-0.241,0-0.483-0.087-0.673-0.261L0.327,1.74c-0.408-0.372-0.438-1.004-0.066-1.413c0.372-0.409,1.004-0.439,1.413-0.066L19.208,16.24L36.743,0.261c0.411-0.372,1.042-0.342,1.413,0.066c0.372,0.408,0.343,1.041-0.065,1.413L19.881,18.332C19.691,18.505,19.449,18.592,19.208,18.592z" />
        </motion.svg>
      </div>
    </header>
  );
}