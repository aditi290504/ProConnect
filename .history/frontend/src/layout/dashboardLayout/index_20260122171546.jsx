import React from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTokenIsThere } from "@/config/redux/reducer/authReducer";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const dispatch = useDispatch();

   useEffect(() => {
          const token = localStorage.getItem("token");
          if(token === null){
              router.push("/login")
          }
          dispatch(setTokenIsThere());


          if(!authState.all_profilesFetcted){
            dispatch(getAll());
            console.log("done")
          }
      },[router]);

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.homeContainer}>
          <div className={styles.homeContainer__left}>
            <div onClick={() =>{
              router.push("/dashboard")
            }} className={styles.sideBarOption}>
              <i class="fa-solid fa-house"> H o m e </i>
              
            </div>
            <div onClick={() =>{
              router.push("/Discover")
            }} className={styles.sideBarOption}>
              <i class="fa-solid fa-magnifying-glass"> S e a r c h </i>
              
            </div>
            <div onClick={() =>{
              router.push("/MyConnections")
            }} className={styles.sideBarOption}>
              <i class="fa-regular fa-user"> My C o n n ec t io n s</i>
              
            </div>
          </div>

          <div className={styles.feedContainer}>{children}</div>
          <div className={styles.extraContainer}>
            <h3>Top Profiles</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
