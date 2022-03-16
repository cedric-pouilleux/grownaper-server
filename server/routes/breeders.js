import express from 'express';
import mongoose from 'mongoose';
import MongodbURI from '../utils/mongodbURI';
import {Breeders} from '../models';
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
     */
    postAdd: app.post('/add', async (req, res) => {
        const { title, picture, link } = req.body;
        await mongoose.connect(MongodbURI);
        Breeders.create({ title, picture, link }, async (err, breeder) => {
            await mongoose.disconnect();
            if(err){
                return res.status(422).json({
                    error : err
                });
            }
            return res.status(201).json({
                message : title + ' successful added',
                breeder
            });
        });
    }),

    /**
     * Remove breeder by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        await mongoose.connect(MongodbURI);
        Breeders.deleteOne(id, async (err, res) => {
            await mongoose.disconnect();
            if(err){
                return res.status(422).end();
            }
            return res.status(201).end();
        });
    })

};