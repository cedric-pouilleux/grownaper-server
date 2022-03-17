import mongoose from "mongoose";
const { Schema } = mongoose;

const plantSchema = new Schema({
    createdAt: Date,
    qrcode: String,
    breeder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Breeder',
        required: true
    },
    variety: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variety',
        required: true
    }
});

export default plantSchema;