import express from 'express';
import mongoose from 'mongoose';
import MongodbURI from '../utils/mongodbURI';
import { Variety } from '../models';

const app = express();

export default {

    /**
     * Get all varieties
     */
    getAll : app.get('/', async (req, res) => {
        await mongoose.connect(MongodbURI);
        const result = await Variety.find({});
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404);
        }
        await mongoose.disconnect();
    }),

    /**
     * Add new variety
     */
    postAdd: app.post('/add', async (req, res) => {
        await mongoose.connect(MongodbURI);
        const name = req.body.name;
        Variety.create({ name: name }, async (err, variety) => {
            await mongoose.disconnect();
            if(err){
                return res.status(422).json({
                    error : err
                });
            }
            return res.status(201).json({
                message : name + ' successful added',
                variety
            });
        });
    }),

    /**
     * Remove variety by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        await mongoose.connect(MongodbURI);
        Variety.deleteOne({ '_id': id }, async (err) => {
            await mongoose.disconnect();
            if(err){
                console.log(err);
                return res.status(422).end();
            }
            return res.status(201).json({
                message: id + 'Has beed delete'
            });
        });
    })

};