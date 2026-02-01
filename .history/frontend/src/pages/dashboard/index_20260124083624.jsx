import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getAllPosts,
} from "@/config/redux/action/postAction/index.js";
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
  const postState = useSelector((state) => state.post);

  const [postContent, setPostContent] = useState("");
  const [fileContent, setFileContent] = useState();

  const handleUpload = async () => {
    await dispatch(createPost({ file: fileContent, body: postContent }));
    setPostContent("")
    setFileContent("")
  };

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
            <textarea
              onChange={(e) => setPostContent(e.target.value)}
              value={postContent}
              name=""
              id=""
              className={styles.textAreaOfContent}
              placeholder="What`s in Your Mind?"
            ></textarea>
            <label htmlFor="fileUpload">
              <div className={styles.fab}>
                <i class="fa-regular fa-file"></i>
              </div>
            </label>
            <input
              onChange={(e) => setFileContent(e.target.files[0])}
              type="file"
              hidden
              id="fileUpload"
            />
            {postContent.length > 0 && (
              <button onClick={handleUpload} className={styles.uploadButton}>
                Post
              </button>
            )}
          </div>
          <div className={styles.postsContainer}>
            {postState.posts.map(())}
            
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
