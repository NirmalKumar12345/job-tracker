import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    description: String,
    location: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    skill: String,
    experience:{
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});

export default mongoose.model("Job",jobSchema);