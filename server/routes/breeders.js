import express from 'express';
import "../utils/database";
import { Breeders } from '../models';

const app = express();

export default {

    /**
     * Get all breeders
     */
    getAll : app.get('/', async (req, res) => {
        const result = await Breeders.find({});
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404).end();
        }
    }),

    /**
     * Add new breeder
     */
    postAdd: app.post('/add', async (req, res) => {
        const { title, picture, link, country } = req.body;
        Breeders.create({ title, picture, link, country }, async (err, breeder) => {
            if(err){
                return res.status(422).json({
                    error : err
                });
            }
            return res.status(201).json({
                message : title + ' successful added',
                breeder
            });
        });
    }),

    /**
     * Remove breeder by id
     */
    delete: app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        Breeders.deleteOne({ '_id': id }, async (err, breeder) => {
            if(err){
                console.log(err);
                return res.status(422).end();
            }
            return res.status(201).json({
                message: id + 'Has beed delete',
                breeder
            });
        });
    })

};