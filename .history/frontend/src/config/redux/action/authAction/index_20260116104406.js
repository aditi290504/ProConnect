import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginUser = createAsyncThunk(
    "user/login",
    async(user, thunkAPI) => {
        try{
            const response = await clientServer.post('/api/users/login', {
                email: user.email,
                password: user.password
            })
            
            localStorage.setItem("token")
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)