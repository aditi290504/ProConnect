import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
    "auth/getAboutUser",
    async (_, thunkAPI) => {
        console.log("Inside getAllPosts thunk");
        try{
            const response = await clientServer.post("/api/users/get_user_and_profile")

            console.log("Posts fetched:", response.data);

            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)