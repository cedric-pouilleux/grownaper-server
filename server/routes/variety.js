import express from 'express';
import "../utils/database";
import {Variety} from '../models';
import slugify from "slugify";

const app = express();

const slugifyVariety = (title, fem, auto) => slugify(`${title} ${fem && 'feminized'} ${auto && 'automatic'}`)

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
        const feminized = req.body.feminized;
        const automatic = req.body.automatic;
        const obj = {
            title,
            feminized,
            automatic,
            slug: slugifyVariety(title, feminized, automatic)
        }

        try {
            await Variety.create(obj);
            return res.status(201).json();
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
        const title = req.body.title;
        const feminized = req.body.feminized;
        const automatic = req.body.automatic;
        const params = {
            title,
            feminized,
            automatic,
            slug: slugifyVariety(title, feminized, automatic)
        }
        try {
            await Variety.findOneAndUpdate({ _id }, params);
            return res.status(201).json();
        } catch(err) {
            console.log(err);
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