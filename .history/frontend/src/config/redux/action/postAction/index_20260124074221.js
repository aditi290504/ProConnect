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
        try{}catch(err){
            
        }
    }
)