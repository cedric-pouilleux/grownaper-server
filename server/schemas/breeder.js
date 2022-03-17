import mongoose from "mongoose";
const { Schema } = mongoose;
import slugify from 'slugify-mongoose';

const breederSchema = new Schema({
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
    link: String,
    picture: String,
    varieties: [{  type: Schema.Types.ObjectId, ref: 'Variety'}]
});


breederSchema.plugin(slugify);

export default breederSchema;