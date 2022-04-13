import express from 'express';
import mongoose from 'mongoose';
import "../utils/database";
import { Plant } from '../models';
import Moment from 'moment';
import History from '../common/history-type';

const router = express.Router();

router.get('/',
    (req, res) => {
       Plant.find({})
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, result) => {
                if (err && !result) {
                    res.status(404).send(err);
                }
                res.status(200).json(result);
            });
});

router.post('/add',
    async (req, res) => {
        const _id = new mongoose.mongo.ObjectId();
        const date = new Date();
        const startFloweringDate = req.body.startFloweringDate;
        const startGrowingDate = req.body.startGrowingDate;
        const obj = {
            _id,
            name: req.body.name,
            createdAt: date,
            collectedDate: null,
            qrcode: 'https://elegant-brahmagupta-4cd12e.netlify.app/plant/' + _id,
            variety: req.body.variety,
            startFloweringDate,
            startGrowingDate
        }
        try {
            const plant = await Plant.create(obj);
            await plant.save();
            const isFloweringBefore = Moment(startFloweringDate).isBefore(date);
            const isGrowingBefore = Moment(startGrowingDate).isBefore(date);
            const history = [History.simple('Creation')];
            if(isGrowingBefore){
                history.push(History.important('Starting growing'));
            }
            if(isFloweringBefore){
                history.push(History.important('Starting flowering'));
            }
            await Plant.findByIdAndUpdate(_id, {
                $addToSet: { history: { $each: history } }
            },
            { returnDocument: 'after'})
                .populate({ path: 'variety', populate: { path: 'breeder' }})
                .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
        }  catch(err) {
            return res.status(422).send(err);
        }
});

router.post('/notes/add/:id',
    async(req, res) => {
        const id = req.params.id;
        const content = req.body.content;
        if(!content) {
            return res.status(422).send('Require content value');
        }
        Plant.findByIdAndUpdate(
            { _id: id },
            {
                $addToSet: {
                    notes: {
                        createdAt: new Date(),
                        content: content
                    },
                    history: History.simple('Add new note')
                }
            },
    { returnDocument: 'after' })
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
});

router.put('/cut/:id',
    (req, res) => {
        const id = req.params.id;
        const currentDate = Date();
        Plant.findOneAndUpdate(
            { _id: id },
                {
                    collectedDate: currentDate,
                    $addToSet: {
                        history: History.important('Collect plant')
                    }
                },
            { returnDocument: 'after' })
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
});

router.put('/edit/:id',
    async (req, res) => {
        const id = req.params.id;
        const { startFloweringDate, startGrowingDate, variety, name } = req.body;
        const currentDate = Moment();
        const isFlowering = startFloweringDate ? Moment(startFloweringDate).isBefore(currentDate) : null;
        const find = await Plant.findById(id);
        let historyTasks = [];
        const data = {};

        if(name){
            data.name = name;
            historyTasks.push(History.simple('Edit plant name'));
        }
        if(variety){
            data.variety = variety;
            historyTasks.push(History.simple('Edit plant variety'));
        }
        if(startFloweringDate){
            data.startFloweringDate = startFloweringDate;
            historyTasks.push(History.simple('Edit flowering date'));
        }
        if(startGrowingDate){
            data.startGrowingDate = startGrowingDate;
            historyTasks.push(History.simple('Edit growing date'));
        }
        if(!isFlowering && find.floweringStarted && startFloweringDate){
            data.floweringStarted = false;
            await Plant.findOneAndUpdate({ _id: id },{ $set: { history: [] }});
        }

        if(Moment().isAfter(startGrowingDate)){
            historyTasks.push(History.important('Start growing'));
        }

        if(isFlowering && !find.floweringStarted){
            data.floweringStarted = true;
            data.startFloweringDate = startFloweringDate;
            historyTasks.push(History.important('Start flowering'));
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
});

router.put('/start-flowering/:id',
    (req, res) => {
        const id = req.params.id;
        const currentDate = new Date();
        Plant.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    startFloweringDate: currentDate,
                    startGrowingDate: currentDate,
                },
                $addToSet: { history: History.important('Starting flowering cycle')}},
            { returnDocument: 'after' })
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
});

router.put('/start-growing/:id',
    (req, res) => {
        const id = req.params.id;
        const currentDate = new Date();
        Plant.findOneAndUpdate(
            { _id: id },
            {
                $set: { startGrowingDate: currentDate },
                $addToSet: { history: History.important('Starting growing cycle')}},
            { returnDocument: 'after' })
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
});


router.put('/start-curring/:id',
    (req, res) => {
        const id = req.params.id;
        const weight = req.body.weight;
        const currentDate = new Date();
        Plant.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    startCurringDate: currentDate,
                    weight
                },
                $addToSet: { history: History.important('Starting curring')}},
            { returnDocument: 'after' })
            .populate({ path: 'variety', populate: { path: 'breeder' }})
            .exec((err, doc) => err ? res.status(422).json(err) : res.status(201).json(doc));
});


router.delete('/delete/:id',
    async (req, res) => {
        const id = req.params.id;
        Plant.deleteOne({ '_id': id })
            .then(() => res.status(201).send(id + 'Has been delete'))
            .catch((err) => res.status(422).send(err.message));
});

export default router;