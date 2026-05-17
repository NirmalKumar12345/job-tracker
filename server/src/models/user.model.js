import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profilePic: {
        type: String,
    },
    currentCTC: {
        type: String,
    },

    expectedCTC: {
        type: String,
    },

    noticePeriod: {
        type: String,
    },

    resume: {
        type: String,
    },
    location: {
        type: String,
    },
    experience: {
        type: String,
    },

    skills: [
        {
            type: String,
        },
    ],
    language: [
        {
            type: String,
        },
    ],

    education: [ {
        type: String,
    }],
    currentCompany: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model('User', userSchema);