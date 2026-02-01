import React from "react";
import styles from "./"

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.home-Container}>
          <div className={styles.home-Container__left}></div>

          <div className={styles.feed-Container}>{children}</div>
          <div className={styles.extra-Container}></div>
        </div>
      </div>
    </div>
  );
}
