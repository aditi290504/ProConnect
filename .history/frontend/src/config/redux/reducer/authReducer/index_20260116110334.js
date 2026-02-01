const { createSlice } = require("@reduxjs/toolkit");
const { connect } = require("react-redux");
const { loginUser } = require("../../action/authAction");


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
        }
    },
    extraReducers: (builder) => {

        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Checking credentials..."
        })
        .ad
    }
})