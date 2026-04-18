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
        console.log(err);
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
      animate={{ x: [-48, 48], scale: [1, 2, 1] }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{
        height: "8px",
        width: "8px",
        backgroundColor: "var(--orangecolor)",
        position: "absolute",
        left: "50vw",
        top: "50vh",
        transform: "translateY(-50%) translateX(-50%)",
        borderRadius: "8px",
      }}
    />
  );
}
