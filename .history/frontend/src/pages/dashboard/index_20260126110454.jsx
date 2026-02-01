import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  deletePost,
  getAllComments,
  getAllPosts,
  incrementPostLike,
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
import { resetPostId } from "@/config/redux/reducer/postReducer";

export default function Dashboard() {
  const router = useRouter();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);

  const [postContent, setPostContent] = useState("");
  const [fileContent, setFileContent] = useState();

  const handleUpload = async () => {
    await dispatch(createPost({ file: fileContent, body: postContent }));
    setPostContent("");
    setFileContent("");
    dispatch(getAllPosts());
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
            {postState.posts.map((post) => {
              return (
                <div key={post._id} className={styles.singleCard}>
                  <div className={styles.singleCard_profileContainer}>
                    <img
                      src={`${baseURL}/uploads/${post.userId.profilePicture}`}
                      alt="img"
                      className={styles.userProfile}
                    />
                    <div>
                      <div
                        onClick={async () => {
                          await dispatch(deletePost({ post_id: post._id }));
                          await dispatch(getAllPosts());
                        }}
                        style={{
                          display: "flex",
                          gap: "1.2rem",
                          justifyContent: "space-between",
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>{post.userId.name}</p>
                        {post?.userId?._id === authState?.user?.userId?._id && (
                          <div>
                            {" "}
                            <i
                              class="fa-solid fa-trash"
                              style={{
                                height: "1.4rem",
                                color: "red",
                                cursor: "pointer",
                              }}
                            ></i>
                          </div>
                        )}
                      </div>

                      <p style={{ color: "gray" }}>{post.userId.username}</p>
                      <p style={{ paddingTop: "1.3rem" }}>{post.body}</p>

                      <div className={styles.singleCard_image}>
                        {post.media && (
                          <img
                            src={`${baseURL}/uploads/${post.media}`}
                            alt="post"
                          />
                        )}
                      </div>

                      <div className={styles.optionsContainer}>
                        <div
                          onClick={async () => {
                            await dispatch(
                              incrementPostLike({ post_id: post._id }),
                            );
                            dispatch(getAllPosts());
                          }}
                          className={styles.singleOption_optionsContainer}
                        >
                          <i class="fa-regular fa-thumbs-up"></i>
                          <p>{post.likes}</p>
                        </div>
                        <div
                          onClick={() => {
                            dispatch(getAllComments({ post_id: post._id }));
                          }}
                          className={styles.singleOption_optionsContainer}
                        >
                          <i class="fa-regular fa-comment"></i>
                          <p>{post.comment}</p>
                        </div>
                        <div
                          onClick={() => {
                            const text = encodeURIComponent(post.body);
                            const url = encodeURIComponent("apnacollege.in");

                            const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                            window.open(twitterUrl, "_blank");
                          }}
                          className={styles.singleOption_optionsContainer}
                        >
                          <i class="fa-solid fa-share"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {postState.postId !== "" && (
          <div
            onClick={() => {
              dispatch(resetPostId());
            }}
            className={styles.commentsContainer}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={styles.allCommentsContainer}
            >
              {postState?.comments?.length === 0 && (
                <h2>No comments yet</h2>
              )}

              <div className={styles.postCommentContainer}>
                <input type="" value={ commentText } onChange={(e) => {
                  setCommentText
                }} />
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </UserLayout>
  );
}
