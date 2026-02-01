import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
  "auth/getPosts",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/posts");

      return thunkAPI.fulfillWithValue(response.data.posts);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (userData, thunkAPI) => {
    try {
      const { body, file } = userData;

      const formData = new FormData();
      formData.append("token", localStorage.getItem("token"));
      formData.append("body", body);
      formData.append("Media", file);

      const response = await clientServer.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        return thunkAPI.fulfillWithValue("Post Uploaded");
      } else {
        return thunkAPI.rejectWithValue("Post not Uploaded");
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (post_id, thunkAPI) => {
    try {
      const response = await clientServer.delete("/delete_post", {
        data: {
          token: localStorage.getItem("token"),
          post_id: post_id.post_id,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const incrementPostLike = createAsyncThunk(
  "post/incrementLike",
  async (post, thunkAPI) => {
    try {
      const response = await clientServer.post("/like_post", {
        post_id: post.post_id,
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const getAllComments = createAsyncThunk(
  "post/getAllComments",
  async(postData , thunkAPI) => {
    try{
      const response = await clientServer.get("/get_post_comments", {
        params:{post_id : postData.post_id}
      });
      return thunkAPI.fulfillWithValue({comments : response.data.comments, postId : postData.post_id})
    }catch(err){
      return thunkAPI.rejectWithValue(err.response.data.message)
    }
  }
)

export const postComment = createAsyncThunk(
  "post/postComment",
  async(commentData , thunkAPI) => {
    try{
      const response = await clientServer.post("/post_comment", {
        post_id : commentData.post_id,
        comment : commentData.comment
      });
      return thunkAPI.fulfillWithValue(response.data.message)
    }catch(err){
      return thunkAPI.rejectWithValue(err.response.data.message)
    } 
  }
)

