import mongoose from "mongoose";
const { Schema } = mongoose;

const plantSchema = new Schema({
    createdAt: Date,
    qrcode: String,

    startGrowingDate: Date,
    startFloweringDate: Date,
    startCurringDate: Date,

    floweringStarted: Boolean,

    collectedDate: Date,
    weight: Number,
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
        createdAt: Date,
        content: String
    }],
    history: [{
        date: Date,
        action: String,
        message: String,
    }]
});

export default plantSchema;