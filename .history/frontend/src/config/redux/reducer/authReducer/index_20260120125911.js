import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { connect } = require("react-redux");
import { loginUser, registerUser } from "../../action/authAction/index.js";


const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    profilefetched: false,
    connections: [],
    connectionRequests: []
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        handleLoginUser: (state) =>{
            state.message = "hello"
        },
        emptyMessage: (state) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {

        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Checking credentials..."
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "Login successful"
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "Login failed"
        })
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Registering user..."
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = {message: "Please login to continue"}
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "Registration failed"
        });
    }
})

export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async(user, thunkAPI) =>{
        try{

            const response = await clie
        }catch(error){
            return thunkAPI.rejectWithValue("Failed to fetch user about info");
        }
    }
)

export const {reset, emptyMessage} = authSlice.actions;

export default authSlice.reducer;