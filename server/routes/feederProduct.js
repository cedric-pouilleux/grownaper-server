import express from 'express';
import "../utils/database";
import {Feeders, FeedersProducts} from '../models';
import {Upload} from "../utils/upload";
import mongoose from "mongoose";

const router = express.Router();

function extractParams(req) {
    const feeder = req.body.feeder;
    const params = {
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
        feeder
    };
    if(req.file?.location){
        params.picture = req.file.location;
    }
    if(req.body.type){
        params.type = req.body.type;
    }
    if(req.body.dosageMin){
        params.dosageMin = req.body.dosageMin;
    }
    if(req.body.dosageMax){
        params.dosageMax = req.body.dosageMax;
    }
    return params;
}

router.get('/',
    async (req, res) => {
        FeedersProducts.find({})
            .populate('feeder')
            .exec((err, result) => {
                if (err && !result) {
                    res.status(404).send(err);
                }
                res.status(200).json(result);
            });
});

router.post('/add',
    Upload.single('picture'),
    async (req, res) => {
        const _id = new mongoose.mongo.ObjectId();
        const params = extractParams(req)
        try {
            const feedersProducts = await FeedersProducts.create({
                _id,
                ...params
            });
            await feedersProducts.save();
            if(params.feeder){
                await Feeders.findByIdAndUpdate(
                    params.feeder,
                    { $addToSet: { products: _id } }
                );
            }
            return res.status(201).json(feedersProducts);
        } catch(err) {
            console.log(err);
            return res.status(422).send(err);
        }
    });

router.put('/edit/:id',
    Upload.single('picture'),
    async (req, res) => {
        const _id = req.params.id;
        const params = extractParams(req);
        try {
            if(params.feeder){
                const find = await FeedersProducts.findOne({_id});
                const old = find.feeder;
                await Feeders.findByIdAndUpdate(params.feeder, { $addToSet: { products: _id } });
                await Feeders.findByIdAndUpdate(old, { $pull: { products: _id } });
            }
            await FeedersProducts.findOneAndUpdate({ _id }, params);
            return res.status(201).send('Edit success');
        } catch(err){
            return res.status(422).send(err);
        }
    });

router.delete('/delete/:id',
    async (req, res) => {
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
});


export default router;