import mongoose from "mongoose";
const { Schema } = mongoose;
import slugify from 'slugify-mongoose';

const feederProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        unique: true,
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true
    },
    picture: {
        type: String,
        required: false
    },
    type: {
        type: String, // => all | flowering | growing
    },
    dosageMin: {
        type: Number,
    },
    dosageMax : {
        type: Number
    },
    description: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    feeder: {
        type: Schema.Types.ObjectId,
        ref: 'Feeder',
        required: true
    }
});

feederProductSchema.plugin(slugify);

export default feederProductSchema;