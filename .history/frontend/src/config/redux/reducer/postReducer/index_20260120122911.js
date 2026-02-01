import { createSlice } from "@reduxjs/toolkit";
const { connect } = require("react-redux");
import { getAllPosts } from "../../action/postAction/index.js";


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
    name: "post",
    initialState,
    reducers: {
        reset: () => initialState,
})