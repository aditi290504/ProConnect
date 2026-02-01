import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { connect } = require("react-redux");
import { getAllUsers, loginUser, registerUser } from "../../action/authAction/index.js";
import { clientServer } from "@/config/index.jsx";
import { getAboutUser } from "../../action/authAction/index.js";

const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    isTokenThere:false,
    profileFetched: false,
    connections: [],
    connectionRequests: [],
    all_users : [],
    all_profiles_fetcted : false
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
        },
        setTokenIsThere: (state) => {
            state.isTokenThere = true
        },
        setTokenIsNotThere: (state) => {
            state.isTokenThere = false
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
        })
        .addCase(getAboutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.profileFetched = true;
        })
        .addCase(getAllUsers.fulfilled , (state, action)=>{
            state.isLoading= false;
            state.isError = false;
            state.all_users = action.payload;
        })
    }
})



export const {reset, emptyMessage, setTokenIsNotThere, setTokenIsThere} = authSlice.actions;

export default authSlice.reducer;