import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
        required: true,
    },
   Id : { 
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