import express from 'express';
import "../utils/database";
import {Breeders} from '../models';
import {Upload} from '../utils/upload'
import mongoose from "mongoose";

const app = express();

export default {

    /**
     * Get all breeders
     */
    all : app.get('/', async (req, res) => {
        try {
            const result = await Breeders.find({});
            return res.status(200).json(result);
        } catch(err){
            return res.status(404).end()
        }
    }),

    /**
     * Add new breeder
     */
    add: app.post(
        '/add',
        Upload.single('picture'),
        async (req, res) => {
            const _id = new mongoose.mongo.ObjectId();
            const params = {
                _id,
                title: req.body.title,
                link: req.body.link,
                country: req.body.country,
                ...(req.file?.location && {picture: req.file.location})
            };
            try {
                await Breeders.create(params);
                return res.status(201).send('successful added');
            } catch(err) {
                return res.status(422).send(err);
            }
        }),

    /**
     * Edit breeder
     */
    edit: app.put(
        '/edit',
        Upload.single('picture'),
        async (req, res) => {
            const { _id } = req.body;
            const params = {
                title: req.body.title,
                link: req.body.link,
                country: req.body.country,
                ...(req.file?.location && {picture: req.file.location})
            };
            try {
                await Breeders.findOneAndUpdate({ _id }, params);
                return res.status(201).send('success');
            } catch(err) {
                return res.status(422).send(err);
            }
    }),

    /**
     * Remove breeder by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        try {
            await Breeders.deleteOne({ '_id': id });
            res.status(201).send('success remove')
        } catch(err){
            return res.status(422).send(err);
        }
    })

};