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
        enum: ["Applied","Reviewing","Rejected","Shortlisted"],
        default: "Applied"
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