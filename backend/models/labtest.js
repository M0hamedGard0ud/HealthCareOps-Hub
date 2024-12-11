import mongoose from "mongoose";

const labtestSchema = mongoose.Schema({
    patemail: {
        type: String,
        required: true,
    },
    labemail: {
        type: String,
        required: true,
    },
    hospitalemail: {
        type: String,
        required: true,
    },
    patient_name: {
        type: String,
        required: true,
    },
    test_name: {
        type: String,
        required: true,
    },
    range: {
        type: String,
        required: true,
    },
    actual_range: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    report: {
        type: String,
        default: "",
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

export const Labtest = mongoose.model("Labtest", labtestSchema);
