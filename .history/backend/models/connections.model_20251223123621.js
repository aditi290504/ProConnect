import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema({
    uId : {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
        required: true,
    },
    receiverId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status_accepted : {
        type: Boolean,
        default: null  
    }
});

export const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequest);