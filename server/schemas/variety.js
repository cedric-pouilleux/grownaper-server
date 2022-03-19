import mongoose from "mongoose";
const { Schema } = mongoose;

const varietySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    feminized: {
        type: Boolean,
        default: false
    },
    automatic: {
        type: Boolean,
        default: false
    },
    breeders: [{  type: Schema.Types.ObjectId, ref: 'Breeder'}]
});

varietySchema.index({
    title: 1,
    feminized: 1,
    automatic: 1
}, { unique: true });

export default varietySchema;