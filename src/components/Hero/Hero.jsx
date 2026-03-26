import styles from "./Hero.module.css";
import Button from "../UI/Button/Button.jsx";
import TextLine from "../UI/TextLine/TextLine.jsx";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Hero({ heroMajor, heroMinor, heroButtons }) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.33 } },
  };

  const childrenVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.875, ease: [0.22, 1, 0.36, 1] },
    },
  };

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
      <motion.div
        className={styles.hero__container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.hero__caption} variants={childrenVariants}>
          {heroMajor}
        </motion.h1>
        <motion.div variants={childrenVariants}>
          <TextLine>{heroMinor}</TextLine>
        </motion.div>

        <nav className={styles.hero__navcontainer}>
          <motion.div variants={childrenVariants}>
            <Button onClick={() => document.querySelector("#employeesBlock").scrollIntoView()}>{heroButtons[0]}</Button>
          </motion.div>
          <motion.div variants={childrenVariants}>
            <Button onClick={() => document.querySelector("#detailsBlock").scrollIntoView()}>{heroButtons[1]}</Button>
          </motion.div>
        </nav>
        <motion.svg
          animate={{ y: [0, -16] }}
          transition={{
            duration: 1.875,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={styles.hero__arrow}
          viewBox="0 0 38 19"
          onClick={scrollHero}
        >
          <path d="M19.208,18.592c-0.241,0-0.483-0.087-0.673-0.261L0.327,1.74c-0.408-0.372-0.438-1.004-0.066-1.413c0.372-0.409,1.004-0.439,1.413-0.066L19.208,16.24L36.743,0.261c0.411-0.372,1.042-0.342,1.413,0.066c0.372,0.408,0.343,1.041-0.065,1.413L19.881,18.332C19.691,18.505,19.449,18.592,19.208,18.592z" />
        </motion.svg>
      </motion.div>
    </header>
  );
}
