import mongoose from "mongoose";
const { Schema } = mongoose;

const plantSchema = new Schema({
    createdAt: Date,
    qrcode: String,
    name: {
        type: String,
        required: false
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