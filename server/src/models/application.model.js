import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    status:{
        type: String,
        enum: ["applied","interview","rejected","accepted"],
        default: "applied"
    },
    appliedDate:{
        type: Date,
        default: Date.now
    },
    resume: {
        type: String,
        required: true
    }
},{timestamps: true});

export default mongoose.model("Application",applicationSchema);