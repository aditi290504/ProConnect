import { createSlice } from "@reduxjs/toolkit";
import {  getAllComments, getAllPosts } from "../../action/postAction/index.js";


const initialState = {
    posts: [],
    isError: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    postFetched: false,
    comments: [],
    postId: "",
    
};
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPosts.pending, (state) => {
            state.isLoading = true
            state.message = "Fetching posts..."
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.postFetched = true;   
            state.posts = action.payload.reverse();
            state.message = "Posts fetched successfully"
        })
        .addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "Failed to fetch posts"   
        })
        .addCase(getAllComments)
        
    }
})

export const { resetPostId } = postSlice.actions;
export default postSlice.reducer;