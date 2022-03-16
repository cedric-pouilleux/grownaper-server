import mongoose from "mongoose";
const { Schema } = mongoose;

const breederSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    link: String,
    picture: String,
});

export default breederSchema;