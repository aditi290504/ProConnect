import React from "react";
import styles from "/index.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="container">
        <div className={styles.home - container}>
          <div className="home-container__left"></div>

          <div className="feed-container">{children}</div>
          <div className="extra-container"></div>
        </div>
      </div>
    </div>
  );
}
