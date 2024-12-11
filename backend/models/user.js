import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        default: ''
    },
    question1: {
        type: String,
    },
    question2: {
        type: String,
    },
    hospitalemail: {
        type: String,
    },
    status: {
        type: String,
        default: 'Pending',
    }
});

export const User = mongoose.model('User', userSchema);
export default userSchema;
