import styles from "./MainLayout.module.css";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import FadeInBlock from "../FadeInBlock/FadeInBlock.jsx";
import Caption from "../UI/Caption/Caption.jsx";
import Announcements from "../Announcements/Announcements.jsx";
import Employees from "../Employees/Employees.jsx";
import Details from "../Details/Details.jsx";
import Contacts from "../Contacts/Contacts.jsx";

export default function MainLayout({
  mainLayoutNewsCaption,
  mainLayoutEmployeesCaption,
  mainLayoutDetailsCaption,
  mainLayoutContactsCaption,
  news,
  employees,
  details,
  contacts,
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <main className={styles.mainlayout}>
        <FadeInBlock>
          <div className={styles.mainlayout__block}>
            <Caption>{mainLayoutNewsCaption}</Caption>
            <Announcements news={news} />
          </div>
        </FadeInBlock>
        <FadeInBlock>
          <div id="employeesBlock" className={styles.mainlayout__block}>
            <Caption>{mainLayoutEmployeesCaption}</Caption>
            <Employees employees={employees} />
          </div>
        </FadeInBlock>
        <FadeInBlock>
          <div id="detailsBlock" className={styles.mainlayout__block}>
            <Caption>{mainLayoutDetailsCaption}</Caption>
            <Details details={details} />
          </div>
        </FadeInBlock>
        <FadeInBlock>
          <div className={styles.mainlayout__block}>
            <Caption>{mainLayoutContactsCaption}</Caption>
            <Contacts contacts={contacts} />
          </div>
        </FadeInBlock>
      </main>

      {createPortal(
        <AnimatePresence>
          {isScrolled && (
            <motion.svg
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={styles.mainlayout__arrowupbtn}
              viewBox="0 0 38 19"
              onClick={scrollToTop}
            >
              <path d="M19.535,0c0.241,0,0.483,0.087,0.673,0.261L38.416,16.852c0.408,0.372,0.438,1.004,0.066,1.413c-0.372,0.409-1.004,0.439-1.413,0.066L19.535,2.352L2,18.331c-0.411,0.372-1.042,0.342-1.413-0.066c-0.372-0.408-0.343-1.041,0.065-1.413L18.862,0.26C19.052,0.087,19.294,0,19.535,0z" />
            </motion.svg>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
