import DashboardLayout from "@/layout/dashboardLayout";
import UserLayout from "@/layout/userLayout";
import React, { useEffect, useState } from "react";
import Styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { baseURL, clientServer } from "@/config";
import { getAboutUser } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const postReducer = useSelector((state) => state.post);

  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (authState.user != undefined) {
      setUserProfile(authState.user);

      let post = postReducer.posts.filter((post) => {
        return post.userId.username === authState.user?.userId?.username;
      });
      setUserPosts(post);
    }
  }, [authState.user, postReducer.posts]);

  const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    const response = await clientServer.post(
      `${baseURL}/api/users/upload_profile_picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  };

  const updateProfileData = async () => {
    const request = await clientServer.post("/api/users/user_update", {
      token: localStorage.getItem("token"),
      name: userProfile.userId.name,
    });

    const response = await clientServer.post("/api/users/update_profile_data", {
      token: localStorage.getItem("token"),
      bio: profile.bio,
      currentPost: profile.currentPost,
      pastWork: profile.pastWork,
      education: profile.education,
    });
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  }

  return (
    <UserLayout>
      <DashboardLayout>
        {authState.user && userProfile.userId && (
          <div className={Styles.container}>
            <div className={Styles.backDropContainer}>
              <div className={Styles.backDrop}>
                <label
                  htmlFor="profilePictureUpload"
                  className={Styles.backDrop_overlay}
                >
                  <p>Edit</p>
                </label>
                <input
                  onChange={(e) => {
                    updateProfilePicture(e.target.files[0]);
                  }}
                  hidden
                  type="file"
                  id="profilePictureUpload"
                />
                <img
                  src={`${baseURL}/${userProfile.userId.profilePicture}`}
                  alt="backgrd"
                />
              </div>
            </div>
            <div className={Styles.profileContainer_details}>
              <div style={{ display: "flex", gap: "0.7rem" }}>
                <div style={{ flex: "0.8" }}>
                  <div
                    style={{
                      display: "flex",
                      width: "fit-content",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      className={Styles.nameEdit}
                      value={userProfile?.userId?.name}
                      onChange={(e) => {
                        setUserProfile({
                          ...userProfile,
                          userId: {
                            ...userProfile.userId,
                            name: e.target.value,
                          },
                        });
                      }}
                    />
                    <p style={{ color: "grey" }}>
                      @{userProfile.userId.username}
                    </p>
                  </div>

                  <div>
                    <p>{userProfile.bio}</p>
                  </div>
                </div>
                <div style={{ flex: "0.2" }}>
                  <h3>Recent Activity</h3>
                  {userPosts.map((post) => {
                    return (
                      <div key={post._id} className={Styles.postCard}>
                        <div className={Styles.card}>
                          <div className={Styles.card_profileContainer}>
                            {post.media !== "" ? (
                              <img
                                src={`${baseURL}/${post.media}`}
                                alt="post media"
                              />
                            ) : (
                              <div
                                style={{ width: "3.4rem", height: "3.4rem" }}
                              ></div>
                            )}
                          </div>
                          <p>{post.body}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={Styles.workHistory}>
              <h4>Work History</h4>

              <div className={Styles.workHistoryContainer}>
                {console.log(userProfile.pastWork)}
                {userProfile?.pastWork?.map((work, index) => {
                  return (
                    <div key={index} className={Styles.workHistoryCard}>
                      <p
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.8rem",
                        }}
                      >
                        {work.company} - {work.position}
                      </p>
                      <p>{work.years}</p>
                      <p>Namaste..</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {userProfile != authState.user && (
              <div className={Styles.connectButton}>Update Profile</div>
            )}
          </div>
        )}
      </DashboardLayout>
    </UserLayout>
  );
}
