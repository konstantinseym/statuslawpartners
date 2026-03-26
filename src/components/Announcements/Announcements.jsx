import styles from "./Announcements.module.css";
import InteractiveCaption from "../UI/InteractiveCaption/InteractiveCaption.jsx";
import ModalAnnouncement from "../ModalAnnouncement/ModalAnnouncement.jsx";
import { useState } from "react";

export default function Announcements({ news }) {

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [isModalAnnouncementsOpen, setIsModalAnnouncementsOpen] =
    useState(false);

  function showModalAnnouncements() {
    setIsModalAnnouncementsOpen(true);
  }

  function hideModalAnnouncements() {
    setIsModalAnnouncementsOpen(false);
  }

  return (
    <div className={styles.announcements}>
      <ModalAnnouncement
        isOpen={isModalAnnouncementsOpen}
        handleClose={hideModalAnnouncements}
        data={selectedAnnouncement}
      />

      {news.map((newsItem) => (
        <InteractiveCaption
          key={newsItem.id}
          onClick={() => {
            setSelectedAnnouncement(newsItem);
            showModalAnnouncements();
          }}
        >
          {newsItem.date} | {newsItem.title}
        </InteractiveCaption>
      ))}
    </div>
  );
}
