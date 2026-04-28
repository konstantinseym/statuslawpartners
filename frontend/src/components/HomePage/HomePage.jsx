import axios from "axios";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import Ftr from "../Ftr/Ftr.jsx";
import Hero from "../Hero/Hero.jsx";
import MainLayout from "../MainLayout/MainLayout.jsx";

export default function HomePage() {
  const [appData, setAppData] = useState();

  useEffect(() => {
    async function fetchAppData() {
      try {
        const res = await axios.get("/api/app-data");
        setAppData(res.data);
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    }

    fetchAppData();
  }, []);

  return appData ? (
    <motion.div
      key="appContent"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.25, ease: "easeInOut" }}
    >
      <Hero
        heroMajor={appData.captions.heroMajor}
        heroMinor={appData.captions.heroMinor}
        heroButtons={[
          appData.captions.employeesCaption,
          appData.captions.detailsCaption,
        ]}
      />
      <MainLayout
        mainLayoutNewsCaption={appData.captions.newsCaption}
        mainLayoutEmployeesCaption={appData.captions.employeesCaption}
        mainLayoutDetailsCaption={appData.captions.detailsCaption}
        mainLayoutContactsCaption={appData.captions.contactsCaption}
        news={appData.news}
        employees={appData.employees}
        details={appData.detailsBlock}
        contacts={appData.contactsBlock}
      />
      <Ftr ftr={appData.footerLink} />
    </motion.div>
  ) : (
    <motion.div
      key="loader"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      style={{
        height: "24px",
        width: "24px",
        border: "4px solid var(--orangecolor)",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
