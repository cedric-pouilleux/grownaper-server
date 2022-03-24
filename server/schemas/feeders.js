import mongoose from "mongoose";
const { Schema } = mongoose;
import slugify from 'slugify-mongoose';

const feederSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    country: {
        type: String,
        required: false,
        minLength: 1
    },
    link: {
        type: String,
        required: false,
        minLength: 6,
        //add pattern for http validation
    },
    picture: {
        type: String,
        required: false
    }
});


feederSchema.plugin(slugify);

export default feederSchema;