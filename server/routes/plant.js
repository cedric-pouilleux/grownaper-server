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
            collected: null,
            qrcode: 'https://elegant-brahmagupta-4cd12e.netlify.app/plant/' + _id,
            variety: req.body.variety,
            startFloweringDate
        }
        try {
            const plant = await Plant.create(obj);
            await plant.save();
            const isBefore = Moment(startFloweringDate).isBefore(date);
            const history = [
                ...isBefore ? [{
                    date: startFloweringDate,
                    action: 'START_FLO',
                    message: 'Starting flowering cycle',
                }] : [],
                {
                    date: date,
                    action: 'ADD',
                    message: 'Creation',
                }
            ];
            await Plant.findByIdAndUpdate(_id, {
                    floweringStarted: isBefore,
                    $addToSet: {
                        history: { $each: history }
                    }
                },
            { returnDocument: 'after'})
                .populate({ path: 'variety', populate: { path: 'breeder' }})
                .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
        }  catch(err) {
            return res.status(422).send(err);
        }
    }),

    /**
     * Add note for plant
     */
    addNote: app.post('/notes/add/:id', async(req, res) => {
        const id = req.params.id;
        const content = req.body.content;
            Plant.findByIdAndUpdate(
                { _id: id },
                {
                    $addToSet: {
                        notes: {
                            createdAt: new Date(),
                            content: content
                        }
                    }
                },
        { returnDocument: 'after' })
                .populate({ path: 'variety', populate: { path: 'breeder' }})
                .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
    }),

    /**
     * Cut plant by id
     */
    cut: app.put('/cut/:id', (req, res) => {
        const id = req.params.id;
        Plant.findOneAndUpdate(
            { _id: id },
                {
                    collected: new Date(),
                    $addToSet: {
                        history: {
                            date: new Date(),
                            action: 'COLLECT',
                            message: 'Collect',
                        }
                    }
                },
            { returnDocument: 'after' })
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
    }),

    /**
     * Edit plant by id
     * Can edit : name, startFloweringDate, variety
     */
    edit: app.put('/edit/:id', async (req, res) => {
        const id = req.params.id;
        const { startFloweringDate, variety, name } = req.body;
        const currentDate = Moment();
        const isFlowering = startFloweringDate ? Moment(startFloweringDate).isBefore(currentDate) : null;
        const find = await Plant.findById(id);
        let historyTasks = [];
        const data = {};

        if(name){
            data.name = name;
            historyTasks.push({ date: currentDate, action: 'EDIT',  message: 'Change name' });
        }
        if(variety){
            data.variety = variety;
            historyTasks.push({ date: currentDate,  action: 'EDIT', message: 'Change variety' });
        }
        if(startFloweringDate){
            data.startFloweringDate = startFloweringDate;
            historyTasks.push({ date: currentDate,  action: 'EDIT',  message: 'Change start flowering date' });
        }
        if(!isFlowering && find.floweringStarted && startFloweringDate){
            data.floweringStarted = false;
            await Plant.findOneAndUpdate({ _id: id },{ $set: { history: [] }});
        }

        if(isFlowering && !find.floweringStarted){
            data.floweringStarted = true;
            data.startFloweringDate = startFloweringDate;
            historyTasks.push({ date: currentDate, action: 'START_FLO',  message: 'Starting flowering cycle' });
            await Plant.findOneAndUpdate({ _id: id },{ $set: { history: [] }});
        }

        Plant.findOneAndUpdate(
            { _id: id },
            {
                $set: data,
                $addToSet: { history: { $each: historyTasks }}
            },
            { returnDocument: 'after' })
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
    }),

    /**
     * Start flowering by ID
     */
    startFlowering: app.put('/start-flowering/:id', (req, res) => {
        const id = req.params.id;
        const currentDate = new Date();
        Plant.findOneAndUpdate(
            { _id: id },
            {
                $set: { floweringStarted: true, startFloweringDate: currentDate },
                $addToSet: { history: { date: currentDate, action: 'START_FLO', message: 'Starting flowering cycle' }}},
            { returnDocument: 'after' })
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
    }),

    /**
     * Start curring by ID
     */
    startCurring: app.put('/start-curring/:id', (req, res) => {
        const id = req.params.id;
        const currentDate = new Date();
        Plant.findOneAndUpdate(
            { _id: id },
            {
                $set: { startCurringDate: currentDate, },
                $addToSet: { history: { date: currentDate, action: 'START_CURRING', message: 'Starting curring' }}},
            { returnDocument: 'after' })
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
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