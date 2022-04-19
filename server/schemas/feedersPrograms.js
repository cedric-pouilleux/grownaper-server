import mongoose from "mongoose";
const { Schema } = mongoose;
import slugify from 'slugify-mongoose';

const feederProgramSchema = new Schema({
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
    products: {
        type: Schema.Types.ObjectId,
        ref: 'FeederProduct',
        required: true
    },
    feeder: {
        type: Schema.Types.ObjectId,
        ref: 'Feeder',
        required: true
    }
});

feederProgramSchema.plugin(slugify);

export default feederProgramSchema;