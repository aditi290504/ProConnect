import React, { useEffect } from "react";
import UserLayout from "@/layout/userLayout";
import DashboardLayout from "@/layout/dashboardLayout";
import { getMyConnectionRequests } from "@/config/redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "@/config";
import styles from "./index.module.css";
import { connection } from "next/server";

export default function MyConnections() {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyConnectionRequests({ token: localStorage.getItem("token") }));
  }, []);

  useEffect(() => {
    if (authState.connectionRequests.length != 0) {
      console.log("Connection Requests: ", authState.connectionRequests);
    }
  }, [authState.connectionRequests]);

  return (
    <div>
      <UserLayout>
        <DashboardLayout>
          <h4>My Connections</h4>
          {authState.connectionRequests.length === 0 && 
            <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
              No Connection Requests Pending
            </h2>
          }

          {authState.connectionRequests.length != 0 &&
            authState.connectionRequests.map((user, index) => {
              return (
                <div className={styles.userCard} key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.2rem",
                    }}
                  >
                    <div className={styles.profilePicture}>
                      <img
                        src={`${baseURL}/${user.userId.profilePicture}`}
                        alt="pic"
                      />
                    </div>
                    <div className={styles.userInfo}>
                      <h3>{connections..name}</h3>
                      <p>{user.userId?.username}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </DashboardLayout>
      </UserLayout>
    </div>
  );
}
