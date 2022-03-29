import mongoose from "mongoose";
const { Schema } = mongoose;

const varietySchema = new Schema({
    slug: {
        type: String,
        required: true,
        sparse:true,
        unique: true,
        index:true
    },
    title: {
        type: String,
        required: true
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

varietySchema.index({
    title: -1,
    phenotype: 1,
    feminized: 1,
    automatic: 1,
    breeder: 1
}, { unique: true });

export default varietySchema;