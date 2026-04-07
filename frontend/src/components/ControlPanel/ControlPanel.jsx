import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ControlPanel.module.css";
import FormAddAnnouncement from "./forms/FormAddAnnouncement.jsx";
import FormDeleteAnnouncement from "./forms/FormDeleteAnnouncement.jsx";
import FormUpdateCaptions from "./forms/FormUpdateCaptions.jsx";
import FormUpdateDetails from "./forms/FormUpdateDetails.jsx";
import FormUpdateContacts from "./forms/FormUpdateContacts.jsx";
import FormUpdateFooterLink from "./forms/FormUpdateFooterLink.jsx";
import FormAddEmployee from "./forms/FormAddEmployee.jsx";

export default function ControlPanel() {
  const [appData, setAppData] = useState(null);

  async function fetchAppData() {
    try {
      const res = await axios.get("/api/getAppData");
      setAppData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  function refreshAnnouncements() {
    fetchAppData();
  }

  useEffect(() => {
    fetchAppData();
  }, []);

  return appData ? (
    <main className={styles.controlpanel}>
      <h1>control panel</h1>
      <FormAddAnnouncement handleAddAnnouncement={refreshAnnouncements} />
      <FormDeleteAnnouncement
        news={appData.news}
        handleDeleteAnnouncement={refreshAnnouncements}
      />
      <FormUpdateCaptions captions={appData.captions} />
      <FormUpdateDetails details={appData.detailsBlock} />
      <FormUpdateContacts contacts={appData.contactsBlock} />
      <FormUpdateFooterLink link={appData.footerLink} />
      <FormAddEmployee />
    </main>
  ) : (
    <></>
  );
}
