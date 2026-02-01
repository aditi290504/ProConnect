import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
    "auth/getPosts",
    async (_, thunkAPI) => {
        
        try{
            const response = await clientServer.get("/posts")

            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async(userData , thunkAPI) => {
        try{
            const formData = new FormData();
            formData.append('token', localStorage.getItem("token"))
            formData.append('body' ,body)
            formData.append('media', file)

            const response  = await clientServer.post("/post", formData, {
                headers: {
                    "Content-Type"
                }
            })
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)