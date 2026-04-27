import axios from "axios";
import { useEffect, useState } from "react";

import AnnouncementsSection from "./sections/AnnouncementsSection.jsx";
import EmployeesSection from "./sections/EmployeesSection.jsx";
import InformationSection from "./sections/InformationSection.jsx";
import FilesSection from "./sections/FilesSection.jsx";

import styles from "./ControlPanel.module.css";
import CaptionsSection from "./sections/CaptionsSection.jsx";

const SECTIONS = {
  news: "news",
  employees: "employees",
  information: "information",
  files: "files",
  captions: "captions",
};

export default function ControlPanel() {
  const [appData, setAppData] = useState(null);
  const [activeSection, setActiveSection] = useState(SECTIONS.news);

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
    <div className={styles.controlpanel}>
      <aside className={styles.navpanel}>
        <nav>
          <ul className={styles.navlist}>
            <li>
              <button
                className={
                  activeSection === SECTIONS.news
                    ? [styles.btn, styles.btnselected].join(" ")
                    : styles.btn
                }
                onClick={() => setActiveSection(SECTIONS.news)}
              >
                News
              </button>
            </li>
            <li>
              <button
                className={
                  activeSection === SECTIONS.employees
                    ? [styles.btn, styles.btnselected].join(" ")
                    : styles.btn
                }
                onClick={() => setActiveSection(SECTIONS.employees)}
              >
                Employees
              </button>
            </li>
            <li>
              <button
                className={
                  activeSection === SECTIONS.information
                    ? [styles.btn, styles.btnselected].join(" ")
                    : styles.btn
                }
                onClick={() => setActiveSection(SECTIONS.information)}
              >
                Information
              </button>
            </li>
            <li>
              <button
                className={
                  activeSection === SECTIONS.files
                    ? [styles.btn, styles.btnselected].join(" ")
                    : styles.btn
                }
                onClick={() => setActiveSection(SECTIONS.files)}
              >
                Files
              </button>
            </li>
            <li>
              <button
                className={
                  activeSection === SECTIONS.captions
                    ? [styles.btn, styles.btnselected].join(" ")
                    : styles.btn
                }
                onClick={() => setActiveSection(SECTIONS.captions)}
              >
                Captions
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.formpanel}>
        {activeSection === SECTIONS.news && (
          <AnnouncementsSection
            handleAddAnnouncement={refreshPanel}
            handleDeleteAnnouncement={refreshPanel}
            news={appData.news}
          />
        )}

        {activeSection === SECTIONS.employees && (
          <EmployeesSection
            employees={appData.employees}
            handleAddEmployee={refreshPanel}
            handleArrangeEmployees={refreshPanel}
            handleDeleteEmployee={refreshPanel}
          />
        )}

        {activeSection === SECTIONS.information && (
          <InformationSection
            details={appData.detailsBlock}
            contacts={appData.contactsBlock}
          />
        )}

        {activeSection === SECTIONS.files && <FilesSection />}

        {activeSection === SECTIONS.captions && (
          <CaptionsSection
            captions={appData.captions}
            link={appData.footerLink}
          />
        )}
      </main>
    </div>
  ) : (
    <></>
  );
}
