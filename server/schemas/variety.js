import mongoose from "mongoose";
const { Schema } = mongoose;

const varietySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    }
});

export default varietySchema;