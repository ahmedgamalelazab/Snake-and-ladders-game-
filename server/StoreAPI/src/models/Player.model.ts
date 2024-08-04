import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    is_in_game: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    });

export const UserModel = mongoose.model('User', UserSchema);


