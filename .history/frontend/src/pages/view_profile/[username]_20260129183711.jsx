import { baseURL, clientServer } from "@/config";
import DashboardLayout from "@/layout/dashboardLayout";
import UserLayout from "@/layout/userLayout";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import Styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";

export default function ViewProfile({ userProfile }) {
  const searchParamers = useSearchParams();

  const router = useRouter();
  const postReducer = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const [userPosts, setUserPosts] = useState([]);

  const [isCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);

  const getUsersPost = async () => {
    await dispatch(getAllPosts());
    await dispatch(getConnectionsRequest({token: localStorage.getItem("token")}) );
  }


  useEffect(() => {
    let post = postReducer.posts.filter((post) => {
      return post.userId.username === router.query.username
    })
    setUserPosts(post);
  }, [postReducer.posts]);

  useEffect(() => {
    console.log(authState.connections, userProfile.userId._id);
    if(authState.connections)
  })
  
  useEffect(() => {
    getUsersPost();
  }, []);




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
                  <h2>{userProfile.userId.name}</h2>
                  <p style={{color: "grey"}}>@{userProfile.userId.username}</p>
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
