import mongoose from "mongoose";
const { Schema } = mongoose;

const plantSchema = new Schema({
    createdAt: Date,
    qrcode: String,
    name: {
        type: String,
        required: false
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Breeder',
        required: true
    },
    variety: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variety',
        required: true
    },
    notes: [{
        date: Date,
        content: String
    }]
});

export default plantSchema;