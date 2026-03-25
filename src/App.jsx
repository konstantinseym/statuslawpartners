import { motion } from "motion/react";
import Hero from "./components/Hero/Hero.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import Ftr from "./components/Ftr/Ftr.jsx";

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.25, ease: "easeInOut" }}
    >
      <Hero />
      <MainLayout />
      <Ftr />
    </motion.div>
  );
}
