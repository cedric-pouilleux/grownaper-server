import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    createdAt: Date,
    roles: Array,
    googleId: String,
    displayName: String,
    emails: Array,
    photos: Array
});

export default userSchema;