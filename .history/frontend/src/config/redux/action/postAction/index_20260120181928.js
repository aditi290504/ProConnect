import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
    "auth/getAboutUser",
    async (_, thunkAPI) => {
        
        try{
            const response = await clientServer.post("/posts")

            console.log("Posts fetched:", response.data);

            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)