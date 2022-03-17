import express from 'express';
import "../utils/database";
import { Plant } from '../models';

const app = express();

export default {

    /**
     * Get all plant
     */
    getAll : app.get('/', async (req, res) => {
        const result = await Plant.find({});
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404).end();
        }
    }),

    /**
     * Add new plant
     */
    postAdd: app.post('/add', async (req, res) => {
        const { createdAt, breeder, variety } = req.body;
        Plant.create({ createdAt, breeder, variety }, async (err, variety) => {
            if(err){
                return res.status(422).json({
                    error : err
                });
            }
            return res.status(201).json({
                message : name + ' successful added',
                variety
            });
        });
    }),

    /**
     * Remove plant by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        Plant.deleteOne({ '_id': id }, async (err) => {
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