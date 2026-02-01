const { createSlice } = require("@reduxjs/toolkit");
const { connect } = require("react-redux");


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
        handleLoginUser: 
    },
    extraReducers: (builder) => {
})