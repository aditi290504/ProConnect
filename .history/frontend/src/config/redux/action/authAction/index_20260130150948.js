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
            
            if(response.data.token){
                localStorage.setItem("token", response.data.token);
            }else{
                return thunkAPI.rejectWithValue("No token received");
            }

            return thunkAPI.fulfillWithValue(response.data.token);
            

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async(user, thunkAPI) => {
        try{
            const request = await clientServer.post('/api/users/register', {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password
            })

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
 
export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async(user, thunkAPI) =>{
        try{

            const response = await clientServer.get("/api/users/get_user_and_profile", {
                params:{
                    token: user.token
                }
            })
            
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue("Failed to fetch user about info");
        }
    }
)

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async(_, thunkAPI) =>{
        try{
            const response = await clientServer.get("/api/users/get_all_users")
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
 
export const sendConnectionRequest = createAsyncThunk(
    "user/sendConnectionRequest",
    async(user, thunkAPI) =>{
        try{
            const response = await clientServer.post("/api/users/send_connection_request", {
                token: user.token,
                connectionId: user.user_id
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
 
export const getConnectionsRequest = createAsyncThunk(
    "user/getConnectionsRequest",
    async(user, thunkAPI) =>{
        try{
            const response = await clientServer.get("/api/users/get_my_connections_request", {
                params: {
                    token: user.token
                }
            })
            return thunkAPI.fulfillWithValue(response.data.connections);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getMyConnectionRequests = createAsyncThunk(
    "user/getMyConnectionRequests",
    async(user, thunkAPI) =>{
        try{
            const response = await clientServer.get("/api/users/get_my_connections_request", {
                params: {
                    token: user.token 
                }
            })
            return thunkAPI.fulfillWithValue(response.data.connectionRequests);  
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }

)

export const AcceptConnection = createAsyncThunk(
    "user/AcceptConnection",
    async(user, thunkAPI) =>{
        try{
            const response = await clientServer.post("/api/users/accept_connection_request", {
                token: user.token,
                connectionId: user.connectionId,
                action_type: user.action
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)