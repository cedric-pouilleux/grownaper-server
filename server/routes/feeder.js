import express from 'express';
import "../utils/database";
import { Feeders} from '../models';
import { Upload } from '../utils/upload'

const router = express.Router();

router.get('/', (req, res) => {
    Feeders.find({})
        .then(result => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(404).send(err);
        });
});

router.post(
    '/add',
    Upload.single('picture'),
    (req, res) => {
    const params = {
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
        ...(req.file?.location && {picture: req.file.location})
    };
    Feeders.create(params)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(422).send(err));
});

router.put(
    '/edit/:id',
    Upload.single('picture'),
    (req, res) => {
    const _id = req.params.id;
    const params = {
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
        ...(req.file?.location && {picture: req.file.location})
    };
    Feeders.findOneAndUpdate({ _id }, params)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(422).send(err));
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    Feeders.deleteOne({ '_id': id })
        .then(result => res.status(201).send(result))
        .catch(err => res.status(422).send(err));
});

export default router;