import mongoose from "mongoose";

const billingSchema = mongoose.Schema({
    patemail: {
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
    amount: {
        type: String,
        required: true,
    },
    amount_paid: {
        type: String,
        required: true,
    },
    balance: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

export const Billing = mongoose.model("Billing", billingSchema);
