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
            .exec((err, result) => {
                if (err && !result) {
                    res.status(404).send(err);
                }
                res.status(200).json(result);
            });
    }),

    /**
     * Add new plant
     */
    postAdd: app.post('/add', async (req, res) => {
        const _id = new mongoose.mongo.ObjectId();
        const obj = {
            _id,
            name: req.body.name,
            createdAt: req.body.createdAt,
            qrcode: 'https://elegant-brahmagupta-4cd12e.netlify.app/plant/' + _id,
            breeder: req.body.breeder,
            variety: req.body.variety,
        }
        Plant.create(obj)
            .then(result => res.status(201).send(_id + 'successful added'))
            .catch(err => res.status(422).send(err));
    }),

    /**
     * Edit plant
     */
    edit: app.put('/edit', async (req, res) => {
        const _id = req.body._id;
        Plant.findOneAndUpdate({ _id }, {
                name: req.body.name,
                createdAt: req.body.createdAt,
                breeder: req.body.breeder,
                variety: req.body.variety,
            })
            .then(result => res.status(201).send(_id + 'successful added'))
            .catch(err => res.status(422).send(err));
    }),

    /**
     * Remove plant by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        Plant.deleteOne({ '_id': id })
            .then(() => res.status(201).send(id + 'Has been delete'))
            .catch((err) => res.status(422).send(err.message));
    })

};