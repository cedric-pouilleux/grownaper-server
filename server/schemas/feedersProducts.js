import mongoose from "mongoose";
const { Schema } = mongoose;
import slugify from 'slugify-mongoose';

const feederProductSchema = new Schema({
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
    picture: {
        type: String,
        required: false
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