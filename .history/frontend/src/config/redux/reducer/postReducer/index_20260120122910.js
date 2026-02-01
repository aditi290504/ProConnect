import { createSlice } from "@reduxjs/toolkit";


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