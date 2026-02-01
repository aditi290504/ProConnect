import React from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.homeContainer}>
          <div className={styles.homeContainer__left}>
            <div onClick={() =>{
              router.push("/")
            }} className={styles.sideBarOption}>
              <i class="fa-solid fa-house"> H o m e </i>
              
            </div>
            <div o className={styles.sideBarOption}>
              <i class="fa-solid fa-magnifying-glass"> S e a r c h </i>
              
            </div>
            <div className={styles.sideBarOption}>
              <i class="fa-regular fa-user"> My C o n n ec t io n s</i>
              
            </div>
          </div>

          <div className={styles.feedContainer}>{children}</div>
          <div className={styles.extraContainer}></div>
        </div>
      </div>
    </div>
  );
}
