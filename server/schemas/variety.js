import mongoose from "mongoose";
import slugify from "slugify-mongoose";
const { Schema } = mongoose;

const varietySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
});

varietySchema.plugin(slugify);

export default varietySchema;