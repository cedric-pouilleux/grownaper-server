import express from 'express';
import "../utils/database";
import {Feeders, FeedersProducts} from '../models';
import {Upload} from "../utils/upload";
import mongoose from "mongoose";

const app = express();

export default {

    get: app.get('/', async (req, res) => {
        FeedersProducts.find({})
            .populate('feeder')
            .exec((err, result) => {
                if (err && !result) {
                    res.status(404).send(err);
                }
                res.status(200).json(result);
            });
    }),

    add: app.post(
        '/add',
        Upload.single('picture'),
        async (req, res) => {
            const feeder = req.body.feeder;
            const _id = new mongoose.mongo.ObjectId();
            const params = {
                _id,
                title: req.body.title,
                link: req.body.link,
                description: req.body.description,
                ...(req.file?.location && { picture: req.file.location }),
                feeder
            };
            try {
                const feedersProducts = await FeedersProducts.create(params);
                await feedersProducts.save();
                if(feeder){
                    await Feeders.findByIdAndUpdate(
                        feeder,
                        { $addToSet: { products: _id } }
                    );
                }
                return res.status(201).json(feedersProducts);
            } catch(err) {
                return res.status(422).send(err);
            }
    }),

    edit: app.put(
        '/edit/:id',
        Upload.single('picture'),
        async (req, res) => {
            const _id = req.params.id;
            const feeder = req.body.feeder;
            const params = {
                title: req.body.title,
                link: req.body.link,
                description: req.body.description,
                ...(req.file?.location && {picture: req.file.location}),
                feeder,
            };
            try {
                if(feeder){
                    const find = await FeedersProducts.findOne({_id});
                    const old = find.feeder;
                    await Feeders.findByIdAndUpdate(feeder, { $addToSet: { products: _id } });
                    await Feeders.findByIdAndUpdate(old, { $pull: { products: _id } });
                }
                await FeedersProducts.findOneAndUpdate({ _id }, params);
                return res.status(201).send('Edit success');
            } catch(err){
                return res.status(422).send(err);
            }

        }),

    remove: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const select = await FeedersProducts.findById(id);
            if(select.feeder){
                await Feeders.findByIdAndUpdate(select.feeder, { $pull: { products: id } });
            }
            await select.remove();
            return res.status(201).send('success');
        } catch(err) {
            return res.status(422).send(err);
        }
    }),
}