import express from 'express';
import "../utils/database";
import {Breeders, Variety} from '../models';

const app = express();

export default {

    /**
     * Get all varieties
     */
    getAll : app.get('/', async (req, res) => {
        const result = await Variety.find({});
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    }),

    /**
     * Add new variety
     */
    postAdd: app.post('/add', async (req, res) => {
        const title = req.body.title;
        Variety.create({ title: title }, async (err, variety) => {
            if(err){
                console.log(err);
                return res.status(422).json({
                    error : err
                });
            }
            return res.status(201).json({
                message : title + ' successful added',
                variety
            });
        });
    }),

    /**
     * Edit variety
     */
    edit: app.put('/edit', async (req, res) => {
        const { _id, title } = req.body;
        try {
            await Variety.findOneAndUpdate(
                { _id },
                { title },
                { new: true }
            );
            return res.status(201).json({
                message : _id + ' successful added'
            });
        } catch(err) {
            console.log(err);
            return res.status(422).json({
                error : err
            });
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