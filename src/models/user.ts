import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default models.User || mongoose.model<IUser>('User', UserSchema);
