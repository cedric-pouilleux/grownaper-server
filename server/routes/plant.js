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
            .populate('Breeder')
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
        const { createdAt, breeder, variety } = req.body;
        const _id = new mongoose.Types.ObjectId();
        //TODO use baseurl
        const qrcode = 'https://elegant-brahmagupta-4cd12e.netlify.app/plant/' + _id;
        Plant.create({ _id, createdAt, breeder, variety, qrcode }, async (err, variety) => {
            if(err){
                return res.status(422).json({
                    error : err
                });
            }
            return res.status(201).json({
                message : variety + ' successful added',
                variety
            });
        });
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