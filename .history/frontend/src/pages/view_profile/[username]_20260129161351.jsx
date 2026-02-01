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
            <img className={Styles.backDrop} src={`${baseURL}/api/users/${/puserProfile.userId.profilePicture}`} alt="backgrd" />
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
