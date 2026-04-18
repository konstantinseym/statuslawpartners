import axios from "axios";
import { useEffect, useState } from "react";

import FormAddAnnouncement from "./forms/FormAddAnnouncement.jsx";
import FormAddEmployee from "./forms/FormAddEmployee.jsx";
import FormDeleteAnnouncement from "./forms/FormDeleteAnnouncement.jsx";
import FormUpdateCaptions from "./forms/FormUpdateCaptions.jsx";
import FormUpdateDetails from "./forms/FormUpdateDetails.jsx";
import FormUpdateContacts from "./forms/FormUpdateContacts.jsx";
import FormUpdateFooterLink from "./forms/FormUpdateFooterLink.jsx";

import styles from "./ControlPanel.module.css";

export default function ControlPanel() {
  const [appData, setAppData] = useState(null);

  async function fetchAppData() {
    try {
      const res = await axios.get("/api/app-data");
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
    <main className={styles.maincontainer}>
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
