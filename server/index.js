import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import {Breeders} from "./models";

dotenv.config();

const app = express();

const { MONGO_DATABASE_USERNAME, MONGO_DATABASE_PASSWORD, MONGO_DATABASE_CLUSTER, MONGO_DATABASE } = process.env;
const uri = `mongodb+srv://${MONGO_DATABASE_USERNAME}:${MONGO_DATABASE_PASSWORD}@${MONGO_DATABASE_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

/**
 * Breaders CRUD
 */
app.route('/breeders')
    .get(async (req, res) => {
        await mongoose.connect(uri);
        const result = await Breeders.find({});
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404);
        }
        await mongoose.disconnect();
    });

app.listen(process.env.PORT || 4000, function() {
    console.log('server running on port 4000', '');
});