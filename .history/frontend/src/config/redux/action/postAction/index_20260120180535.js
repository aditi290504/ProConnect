import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
    "/api/users/get_user_and_profile",
    async (_, thunkAPI) => {
        console.log("Inside getAllPosts thunk");
        try{
            const response = await clientServer.get("/posts")

            console.log("Posts fetched:", response.data);

            return thunkAPI.fulfillWithValue(response.data);
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)