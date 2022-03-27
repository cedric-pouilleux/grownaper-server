import express from 'express';
import "../utils/database";
import {Breeders, Feeders, Variety} from '../models';
import { varietyPayloadBuilder } from "../utils/builders";

const app = express();

export default {

    /**
     * Get all varieties
     */
    getAll : app.get('/', async (req, res) => {
        try {
            const result = await Variety.find({});
            return res.status(200).json(result);
        } catch(err) {
            return res.status(404).send(err);
        }
    }),

    /**
     * Add new variety
     */
    postAdd: app.post('/add', async (req, res) => {
        const params = varietyPayloadBuilder(req.body);
        try {
            const breeders = params.breeders;
            if(breeders){
                await Breeders.findByIdAndUpdate(feeder,
                    { $addToSet: {varieties: { $each: breeders }}}
                    );
            }
            console.log(params);
            await Variety.create(params);
            return res.status(201).json();
        } catch(err) {
            return res.status(422).send('Error with server [422]');
        }
    }),

    /**
     * Edit variety
     */
    edit: app.put('/edit', async (req, res) => {
        const _id = req.body._id;
        const params = varietyPayloadBuilder(req.body);
        try {
            await Variety.findOneAndUpdate({ _id }, params);
            return res.status(201).json();
        } catch(err) {
            return res.status(422).send('Error with server [422]');
        }
    }),

    /**
     * Remove variety by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        Variety.deleteOne({ '_id': id }, async (err) => {
            if(err){
                return res.status(422).end();
            }
            return res.status(201).json({
                message: id + 'Has beed delete'
            });
        });
    })

};