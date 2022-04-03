import express from 'express';
import mongoose from 'mongoose';
import "../utils/database";
import { Plant } from '../models';
import Moment from 'moment';

const app = express();

export default {

    /**
     * Get all plant
     */
    getAll : app.get('/', (req, res) => {
       Plant.find({})
            .populate({ path: 'variety', populate: { path: 'breeder' }})
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
        const date = new Date();
        const startFloweringDate = req.body.startFloweringDate;
        const obj = {
            _id,
            name: req.body.name,
            createdAt: date,
            qrcode: 'https://elegant-brahmagupta-4cd12e.netlify.app/plant/' + _id,
            variety: req.body.variety,
            startFloweringDate
        }
        try {
            /**
             * Try make one request here, create and populate history
             */
            const plant = await Plant.create(obj);
            await plant.save();
            if(Moment(startFloweringDate).isBefore(date)){
                await Plant.findByIdAndUpdate(_id, {
                    floweringStarted: true,
                    $addToSet: {
                        history: {
                            date: startFloweringDate,
                            action: 'START_FLO',
                            message: 'Starting flowering cycle',
                        }
                    }
                });
            }
            await Plant.findByIdAndUpdate(_id, {
                $addToSet: {
                    history: {
                        date: date,
                        action: 'ADD',
                        message: 'Creation',
                    }
                }
            });
            return res.status(201).send('Success added');
        }  catch(err) {
            console.log(err);
            return res.status(422).send(err);
        }
    }),

    /**
     * Add note for plant
     */
    addNote: app.post('/notes/add/:id', async(req, res) => {
        const id = req.params.id;
        const date = req.body.date;
        const content = req.body.content;
        try {
            await Plant.findByIdAndUpdate(id, {
                $addToSet: {
                    notes: {
                        date,
                        content
                    }
                }
            });
            return res.status(201).send('successful added note');
        } catch(err) {
            return res.status(422).send(err);
        }
    }),

    editFloweringDate: app.put('/edit/:id', (req, res) => {
        const id = req.params.id;
        const { startFloweringDate, variety } = req.body;
        const currentDate = Moment();
            const historyTasks = [
                ... startFloweringDate ? [{ date: currentDate,  action: 'EDIT',  message: 'Change start flowering date' }] : [],
                ... variety ? [{ date: currentDate, action: 'EDIT', message: 'Change variety' }] : [],
            ];
            const data = {
                ... startFloweringDate ? { startFloweringDate: startFloweringDate } : {},
                ... variety ? { variety: variety } : {} ,
            };
            Plant.findOneAndUpdate(
                { _id: id },
                { $set: data, $addToSet: { history: { $each: historyTasks }}},
                { returnDocument: 'after' })
                .populate({ path: 'variety', populate: { path: 'breeder' }})
                .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
    }),

    edit: app.put('/edit', async (req, res) => {
        const _id = req.body._id;
        Plant.findOneAndUpdate({ _id }, {
                name: req.body.name,
                createdAt: req.body.createdAt,
                breeder: req.body.breeder,
                variety: req.body.variety,
                feminized: req.body.feminized,
                automatic: req.body.automatic,
            })
            .then(() => res.status(201).send(_id + 'successful added'))
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