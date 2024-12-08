import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../utils/type';

const userSchema = new Schema<IUser>({
    fullName: {
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
}, {
    timestamps: true, 
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

const User = model<IUser>('User', userSchema);

export default User;