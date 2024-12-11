import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
    patemail: {
        type: String,
        required: true,
    },
    hospitalemail: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: String,
        default: new Date().toISOString(),
    },
});

export const Feedback = mongoose.model("Feedback", feedbackSchema);
