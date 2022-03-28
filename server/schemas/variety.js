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
    floTime: {
        type: Number,
        default: 80
    },
    phenotype: {
        type: Number,
        required: true
    },
    feminized: {
        type: Boolean,
        default: false
    },
    automatic: {
        type: Boolean,
        default: false
    },
    breeder: {
        type: Schema.Types.ObjectId,
        ref: 'Breeder'
    }
});

export default varietySchema;