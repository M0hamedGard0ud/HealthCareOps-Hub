import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema({
    patemail: {
        type: String,
        required: true,
    },
    hospitalemail: {
        type: String,
        required: true,
    },
    doctor_name: {
        type: String,
        required: true,
    },
    patient_name: {
        type: String,
        required: true,
    },
    findings: {
        type: String,
        required: true,
    },
    lab_test: {
        type: String,
    },
    medicine_1: {
        type: String,
    },
    medicine_2: {
        type: String,
    },
    medicine_3: {
        type: String,
    },
    medicine_4: {
        type: String,
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending",
    },
    dateCreated: {
        type: String,
        default: new Date().toISOString(),
    },
});

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
