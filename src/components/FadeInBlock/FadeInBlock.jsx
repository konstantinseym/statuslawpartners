import { motion } from "motion/react";

export default function FadeInBlock({ children }) {
  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, y: "96px" }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
