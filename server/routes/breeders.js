import express from 'express';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import MongodbURI from '../utils/mongodbURI';
import {Breeders} from '../models';
import slugify from 'slugify';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

export default {

    /**
     * Get all breeders
     */
    getAll : app.get('/', async (req, res) => {
        await mongoose.connect(MongodbURI);
        const result = await Breeders.find({});
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404);
        }
        await mongoose.disconnect();
    }),

    /**
     * Add new breeder
     * title: string,
     * picture?: string,
     * link?: string
     */
    postAdd: app.post('/add', async (req, res) => {
        const { title, picture, link } = req.body;
        console.log( title, picture, link);
        await mongoose.connect(MongodbURI);
        Breeders.create({ title, picture, link, slug: slugify(title)}, async (err, breeder) => {
            await mongoose.disconnect();
            if(err){
                throw new Error(err)
                res.status(500);
            }
            res.status(201).end();
        });
    })

};