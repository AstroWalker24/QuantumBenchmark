import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        sparse: true
    },
    passwordHash: {
        type: String
    },
    name: {
        type: String
    },
    avatarUrl: {
        type: String
    },
    provider: {
        type: String,
        enum: ['local', 'google', 'github'],
        default: 'local'
    },
    providerId: {
        type: String
    }
}, {timestamps: true});

export default mongoose.model('User', userSchema);
