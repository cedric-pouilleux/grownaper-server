import express from 'express';
import mongoose from "mongoose";
import MongodbURI from "../utils/mongodbURI";
import {Breeders} from "../models";
const app = express();

app.use(express.json());

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

export const add = app.post('/add',
    async (req, res) => {
        const { title, picture, link } = req.body.title;
        await mongoose.connect(MongodbURI);
        Breeders.create({ title, picture, link}, async (err, breeder) => {
            await mongoose.disconnect();
            if(err){
                throw new Error('Error with post breeders')
                res.status(500);
            }
            res.status(201).end();
        });
    }
);