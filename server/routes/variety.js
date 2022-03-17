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
        await mongoose.connection.close();
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    }),

    /**
     * Add new variety
     */
    postAdd: app.post('/add', async (req, res) => {
        await mongoose.connect(MongodbURI);
        const title = req.body.title;
        Variety.create({ title: title }, async (err, variety) => {
            await mongoose.connection.close();
            if(err){
                return res.status(422).json({
                    error : err
                });
            }
            return res.status(201).json({
                message : title + ' successful added',
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
            await mongoose.connection.close();
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