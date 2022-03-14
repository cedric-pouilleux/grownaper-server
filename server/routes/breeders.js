import express from 'express';
import mongoose from "mongoose";
import MongodbURI from "../utils/mongodbURI";
import {Breeders} from "../models";
const app = express();

export const getAll = app.get('/',
    async (req, res) => {
        await mongoose.connect(MongodbURI);
        const result = await Breeders.find({});
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404);
        }
        await mongoose.disconnect();
    }
);