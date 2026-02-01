import { baseURL, clientServer } from "@/config";
import DashboardLayout from "@/layout/dashboardLayout";
import UserLayout from "@/layout/userLayout";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Styles from "./index.module.css";

export default function ViewProfile({ userProfile }) {
  const searchParamers = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    console.log("From view: view profile page");
  });
  return (
    <UserLayout>
      <DashboardLayout>
        <div className={Styles.container}>
          <div className={Styles.backDropContainer}>
            <img className={Styles.backDrop} src={`${baseURL}/${userProfile.userId.profilePicture}`} alt="backgrd" />
          </div>
          <div className={Styles.profileContainer_details}>
            <div style={{display: "flex", gap: "0.7rem"}}>
              <div style={{flex: "0.8"}}>
                <div style={{display: "flex", width: "fit-content", alignItems: "center"}}>
                  <h2>{pro</h2>
                </div>
              </div>
              <div style={{flex: "0.2"}}></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export async function getServerSideProps(context) {
  console.log("From View");
  console.log(context.query.username);

  const request = await clientServer.get(
    "/api/users/get_user_profile_by_username",
    {
      params: {
        username: context.query.username,
      },
    },
  );

  const response = await request.data;
  console.log(response);

  return { props: { userProfile: request.data.profile } };
}
