import express from 'express';
import "../utils/database";
import {Breeders} from '../models';
import {Upload} from '../utils/upload'

const app = express();

export default {

    /**
     * Get all breeders
     */
    all : app.get('/', async (req, res) => {
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
    add: app.post(
        '/add',
        Upload.single('picture'),
        async (req, res) => {
            Breeders.create({
                title: req.body.title,
                link: req.body.link,
                country: req.body.country,
                ...(req.file?.location && {picture: req.file.location})
            },async (err, breeder) => {
                if(err){
                    return res.status(422).json({
                        error : err
                    });
                }
                return res.status(201).send('successful added');
            });
        }),

    /**
     * Edit breeder
     */
    edit: app.put(
        '/edit',
        Upload.single('picture'),
        async (req, res) => {
            const { _id } = req.body;
            try {
                await Breeders.findOneAndUpdate(
                    { _id },
                    {
                        title: req.body.title,
                        link: req.body.link,
                        country: req.body.country,
                        ...(req.file?.location && {picture: req.file.location})
                    },
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