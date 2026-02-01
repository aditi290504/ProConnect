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
    ye