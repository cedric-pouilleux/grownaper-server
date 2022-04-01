import express from 'express';
import "../utils/database";
import {Breeders, Variety} from '../models';
import { varietyPayloadBuilder } from "../utils/builders";
import mongoose from "mongoose";

const app = express();

export default {

    /**
     * Get all varieties
     */
    getAll : app.get('/', async (req, res) => {
        Variety.find({})
            .populate('breeder')
            .exec((err, result) => {
                if (err && !result) {
                    res.status(404).send(err);
                }
                res.status(200).json(result);
            });
    }),

    /**
     * Add new variety
     */
    postAdd: app.post('/add', async (req, res) => {
        const _id = new mongoose.mongo.ObjectId();
        const params = varietyPayloadBuilder(req.body);
        const breeder = req.body.breeder;
        try {
            await Variety.create({ ...params, _id});
            if(breeder){
                await Breeders.findByIdAndUpdate(breeder,{ $addToSet: { varieties: _id } });
            }
            return res.status(201).send('Add Success');
        } catch(err) {
            console.log(err);
            return res.status(422).send('Error with server [422]');
        }
    }),

    /**
     * Edit variety
     */
    edit: app.put('/edit', async (req, res) => {
        const _id = req.body._id;
        const params = varietyPayloadBuilder(req.body);
        const breeder = req.body.breeder;
        try {
            if(breeder){
                const find = await Variety.findOne({_id});
                const old = find.breeder;
                await Breeders.findByIdAndUpdate(breeder, { $addToSet: { varieties: _id } });
                await Breeders.findByIdAndUpdate(old, { $pull: { varieties: _id } });
            }
            await Variety.findOneAndUpdate({ _id }, params);
            return res.status(201).send('Success edit');
        } catch(err) {
            return res.status(422).send('Error with server [422]');
        }
    }),

    /**
     * Remove variety by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const select = await Variety.findById(id);
            if(select.breeder){
                await Breeders.findByIdAndUpdate(select.breeder, { $pull: { varieties: id } });
            }
            await select.remove();
            return res.status(201).send('Success delete');
        } catch(err) {
            return res.status(422).send('Error with server [422]');
        }
    })

};