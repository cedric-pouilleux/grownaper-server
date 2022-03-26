import mongoose from "mongoose";
const { Schema } = mongoose;
import slugify from 'slugify-mongoose';

const feederSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        unique: true
    },
    description: {
      type: String,
      required: false,
    },
    slug: {
        type: String,
        slug: 'title',
    },
    picture: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    products: [{  type: Schema.Types.ObjectId, ref: 'FeederProduct'}]
});


feederSchema.plugin(slugify);

export default feederSchema;