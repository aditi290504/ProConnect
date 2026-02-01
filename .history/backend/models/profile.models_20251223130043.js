import mongoose from "mongoose";
import { y } from "pdfkit";

const educationSchema = new mongoose.Schema({
    school : {
        type: String,
        default: ''
    },
    degree : { 
        type: String,
        default: ''
    },
    fieldOfStudy : {
        type: String,
        default: ''
    }
});

const workSchema = new mongoose.Schema({
    company : {
        type: String,  
        default: ''
    },
    position : {
        type: String,   
        default: ''
    },
    years : {
        type: Number,
        default: 0
    }
});

const profileSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User',
    },  
    bio : {
        type: String,
        default: ''
    },
    currentPost