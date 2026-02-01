import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema({
    requesterId : {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
        required: true,
    },
    receiverId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status : {
        type: boolean,
        default: n  
    }
});

export const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequest);