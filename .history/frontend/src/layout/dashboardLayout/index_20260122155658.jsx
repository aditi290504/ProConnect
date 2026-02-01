import React from "react";
import styles from "./index.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.homeContainer}>
          <div className={styles.homeContainer__left}>
            <div className={styles.sideBarOption}>
              <i class="fa-solid fa-house"> Home </i>
              
            </div>
            <div className={styles.sideBarOption}>
              <i class="fa-solid fa-magnifying-glass"> Search </i>
              
            </div>
          </div>

          <div className={styles.feedContainer}>{children}</div>
          <div className={styles.extraContainer}></div>
        </div>
      </div>
    </div>
  );
}
