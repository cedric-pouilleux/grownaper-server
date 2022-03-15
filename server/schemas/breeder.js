import mongoose from "mongoose";
const { Schema } = mongoose;
import uniqueValidator from 'mongoose-unique-validator';

export const breederSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    link: String,
    picture: String,
}).plugin(uniqueValidator);