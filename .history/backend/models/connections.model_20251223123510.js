import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema({
    requesterId : {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
        required: true,
    },
    receiverId : {