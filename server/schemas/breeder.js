import mongoose from "mongoose";
const { Schema } = mongoose;

export const breederSchema = new Schema({
    title: String,
    link: String,
    picture: String
});