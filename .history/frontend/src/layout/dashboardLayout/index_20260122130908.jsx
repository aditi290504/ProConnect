import React from "react";
import styles from "./index.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.home - container}>
          <div className={styles.home-container__left}></div>

          <div className={styles.feed-container}>{children}</div>
          <div className={styles.extra-container}></div>
        </div>
      </div>
    </div>
  );
}
