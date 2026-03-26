import { motion } from "motion/react";

export default function FadeInBlock({ children }) {
  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-196px" }}
      transition={{ duration: 0.875, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
