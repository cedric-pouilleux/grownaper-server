import mongoose from "mongoose";
const { Schema } = mongoose;

const plantSchema = new Schema({
    createdAt: Date,
    qrcode: String,
    breeder: {
        type: Schema.Types.ObjectId,
        ref: 'Breeder',
        required: true
    },
    variety: {
        type: Schema.Types.ObjectId,
        ref: 'Variety',
        required: true
    }
});

export default plantSchema;