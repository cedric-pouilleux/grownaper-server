import express from 'express';
import mongoose from 'mongoose';
import "../utils/database";
import { Plant } from '../models';

const app = express();

export default {

    /**
     * Get all plant
     */
    getAll : app.get('/', (req, res) => {
       Plant.find({})
            .populate('breeder')
            .populate('variety')
            .exec(function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(404).end();
                }
                res.status(200).json(result);
            });
    }),

    /**
     * Add new plant
     */
    postAdd: app.post('/add', async (req, res) => {
        const _id = new mongoose.mongo.ObjectId();
        console.log(req.body);
        try {
            await Plant.create({
                ...req.body,
                qrcode : 'https://elegant-brahmagupta-4cd12e.netlify.app/plant/'
            });
            return res.status(201).json({
                message : _id + ' successful added',
            });
        } catch(err) {
            console.error(err);
            return res.status(422).json({ err }).end();
        }
    }),

    /**
     * Edit plant
     */
    edit: app.put('/edit', async (req, res) => {
        const _id = req.body._id;
        console.log(req.body);
        try {
            await Plant.findOneAndUpdate({ _id }, req.body);
            return res.status(201).json({
                message : _id + ' successful added'
            });
        } catch(err) {
            console.log(err);
            return res.status(422).json({
                error : err
            });
        }
    }),

    /**
     * Remove plant by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        Plant.deleteOne({ '_id': id }, async (err) => {
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