import mongoose from "mongoose";
const { Schema } = mongoose;

const plantSchema = new Schema({
    createdAt: Date,
    qrcode: String,
    startFloweringDate: Date,
    floweringStarted: Boolean,
    collected: Date,
    startCurringDate: Date,
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
    }],
    history: [{
        date: Date,
        action: String,
        message: String,
    }]
});

export default plantSchema;