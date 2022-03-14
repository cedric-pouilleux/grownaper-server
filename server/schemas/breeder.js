import mongoose from "mongoose";
const { Schema } = mongoose;

export const breederSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    link: String,
    picture: String,
});