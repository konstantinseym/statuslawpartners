import styles from "./ModalAnnouncement.module.css";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import Caption from "../UI/Caption/Caption.jsx";
import TextLine from "../UI/TextLine/TextLine.jsx";

export default function ModalAnnouncement({ isOpen, handleClose, data }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={styles.modalannouncement}
        >
          <svg
            className={styles.modalannouncement__closebtn}
            viewBox="0 0 38 19"
            onClick={handleClose}
          >
            <path d="M19.208,18.592c-0.241,0-0.483-0.087-0.673-0.261L0.327,1.74c-0.408-0.372-0.438-1.004-0.066-1.413c0.372-0.409,1.004-0.439,1.413-0.066L19.208,16.24L36.743,0.261c0.411-0.372,1.042-0.342,1.413,0.066c0.372,0.408,0.343,1.041-0.065,1.413L19.881,18.332C19.691,18.505,19.449,18.592,19.208,18.592z" />
          </svg>
          <div className={styles.modalannouncement__container}>
            <Caption style={{ margin: 0 }}>{data.title}</Caption>
            <TextLine style={{ overflow: "auto", maxHeight: "70vh" }}>
              {data.content}
            </TextLine>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
