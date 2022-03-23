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
    floTime: {
        type: Number,
        default: 80
    },
    breeders: [{  type: Schema.Types.ObjectId, ref: 'Breeder'}]
});

export default varietySchema;