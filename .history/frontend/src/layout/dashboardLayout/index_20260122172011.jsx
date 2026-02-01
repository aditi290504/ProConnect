import React from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTokenIsThere } from "@/config/redux/reducer/authReducer";
import { getAllUsers } from "@/config/redux/action/authAction";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();

   useEffect(() => {
          const token = localStorage.getItem("token");
          if(token === null){
              router.push("/login")
          }
          dispatch(setTokenIsThere());


          if(!authState.all_profilesFetcted){
            dispatch(getAllUsers());
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
            {authState.all_profilesFetcted && authState.all_users}
          </div>
        </div>
      </div>
    </div>
  );
}
