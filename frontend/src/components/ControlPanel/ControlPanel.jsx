import axios from "axios";
import { useEffect, useState } from "react";

import FormAddAnnouncement from "./forms/FormAddAnnouncement.jsx";
import FormAddEmployee from "./forms/FormAddEmployee.jsx";
import FormArrangeEmployees from "./forms/FormArrangeEmployees.jsx";
import FormDeleteAnnouncement from "./forms/FormDeleteAnnouncement.jsx";
import FormDeleteEmployee from "./forms/FormDeleteEmployee.jsx";
import FormUpdateCaptions from "./forms/FormUpdateCaptions.jsx";
import FormUpdateDetails from "./forms/FormUpdateDetails.jsx";
import FormUpdateContacts from "./forms/FormUpdateContacts.jsx";
import FormUpdateFooterLink from "./forms/FormUpdateFooterLink.jsx";
import FormUpdateHeroImage from "./forms/FormUpdateHeroImage.jsx";
import FormUpdatePolicy from "./forms/FormUpdatePolicy.jsx";

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

  function refreshPanel() {
    fetchAppData();
  }

  useEffect(() => {
    fetchAppData();
  }, []);

  return appData ? (
    <main className={styles.maincontainer}>
      <FormAddAnnouncement handleAddAnnouncement={refreshPanel} />
      <FormDeleteAnnouncement
        news={appData.news}
        handleDeleteAnnouncement={refreshPanel}
      />
      <FormUpdateCaptions captions={appData.captions} />
      <FormUpdateDetails details={appData.detailsBlock} />
      <FormUpdateContacts contacts={appData.contactsBlock} />
      <FormUpdateFooterLink link={appData.footerLink} />
      <FormAddEmployee handleAddEmployee={refreshPanel} />
      <FormArrangeEmployees
        employees={appData.employees}
        handleArrangeEmployees={refreshPanel}
      />
      <FormDeleteEmployee
        employees={appData.employees}
        handleDeleteEmployee={refreshPanel}
      />
      <FormUpdatePolicy />
      <FormUpdateHeroImage />
    </main>
  ) : (
    <></>
  );
}
