import express from 'express';
import "../utils/database";
import { Variety } from '../models';

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
        console.log(title);
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
     * Remove variety by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        Variety.deleteOne({ '_id': id }, async (err) => {
            if(err){
                console.log(err);
                return res.status(422).end();
            }
            return res.status(201).json({
                message: id + 'Has beed delete'
            });
        });
    })

};