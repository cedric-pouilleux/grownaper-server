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
    breeders: [{  type: Schema.Types.ObjectId, ref: 'Breeder'}]
});

varietySchema.plugin(slugify);

export default varietySchema;