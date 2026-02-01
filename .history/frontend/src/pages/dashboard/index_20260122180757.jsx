import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction/index.js";
import { getAboutUser } from "@/config/redux/action/authAction/index.js";
import UserLayout from "@/layout/userLayout";
import DashboardLayout from "@/layout/dashboardLayout";
import {
  setTokenIsThere,
  setTokenIsNotThere,
} from "@/config/redux/reducer/authReducer";
import styles from "./index.module.css";
import { baseURL } from "@/config";

export default function Dashboard() {
  const router = useRouter();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isTokenThere) {
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }
  }, [authState.isTokenThere]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.scrollComponent}>
          <div className={styles.createPostContainer}>
            <img
              src={
                authState.user?.userId?.profilePicture
                  ? `${baseURL}/${authState.user.userId.profilePicture}`
                  : "C:\Users\Aditi Anarase\Desktop\LinkedIn\backend\uploads\default-profile.png"
              }
              alt="profile"
            />
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
